const express = require('express');
const bcrypt = require('bcryptjs');
const dbconnect = require('../config/dbConnection.js');
const { application, response } = require('express');
const salty = 10;

const ingresaTutor = async (req, res) => {
    const { nombretut, password, confpassword, nombrealu, apellidoalu, nacimiento, schoolmester, foto, grupo } = req.body;
    console.log(schoolmester)
    if(!nombretut || !password || !confpassword || !nombrealu || !apellidoalu || !nacimiento || !schoolmester || !foto || !grupo) {
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        dbconnect.query('SELECT * FROM nombres_tutor_hijos', (error, resp) => {
            if(error)
                console.log(error)
            else{
                let newtut = nombretut;
                let newal = nombrealu+" "+apellidoalu;
                for(let i = 0; i<resp.length; i++){
                if(resp[i].usuario == newtut){
                    if(resp[i].nombre == newal)
                        return res.status(409).send({ success: false, message: 'No se pueden duplicar registros del padre con el mismo estudiante'})
                    }
                }
                bcrypt.hash(password, salty, function(err, hash) {
                    dbconnect.query('CALL SPCreateTutor(?, ?, ?, ?, ?, ?, ?, ?)', [nombretut, confpassword, nombrealu, apellidoalu, nacimiento, schoolmester, foto, grupo], (error, response) => {
                        if(error)
                            console.log(error)
                        else{
                            response.message = "Se ha creado un nuevo tutor e ingresado un nuevo alumno!";
                                    return res.status(200).json(response)
                        }
                    })
                })
            }
        })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

const ingresaAdmin = async (req, res) => {
    const { nombread, apellidoad, password, confpassword } = req.body;
    if(!nombread || !apellidoad || !password || !confpassword){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    const fullname = nombread+" "+apellidoad;
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    dbconnect.query ('SELECT contrasenia FROM admin', (error, response, fields) => {
        if(error)
            console.log(error)
        else{
            for(let i = 0; i<response.length; i++){
            if(response[i].usuario == fullname){
                bcrypt.compare(password, response, (er, result) => {
                if(er)
                    console.log(er);
                if(result)
                    return res.status(409).send({ success: false, message: 'Registro de administrador ya existente'})
                })
            }
            }
        }
    })
    if(isPassValid(password)){
        dbconnect.query('SELECT idAdministrador FROM admin', (err, resonse, fields) =>{
        if(err) 
            console.log(err)
        else{
                let newaid = 0;
                for(let i = 0; i<resonse.length; i++){
                    newaid = resonse[i].idAdministrador;
                }
                newaid++;
                bcrypt.hash(password, salty, function(er, hash) {
                dbconnect.query('INSERT INTO admin(idAdministrador, usuario, contrasenia) VALUES (?, ?, "'+hash+'")', [newaid, fullname], (er, resose, field) => {
                    if(er)
                        console.log(er)
                    else{
                            resose.message = "Se ha creado un nuevo administrador!";
                            return res.status(200).json(resose);
                        }
                    })
                })
            }
        })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

const getGrupos = async (req, res) => {
    dbconnect.query('SELECT idGrupo, nombre FROM grupo', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response)
        }
    })
}

const getAdmins = async (req, res) => {
    dbconnect.query('SELECT * FROM admin', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getAdmin = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT * FROM admin WHERE idAdministrador = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response)
        }
    })
}

const getTutores = async (req, res) => {
    dbconnect.query('SELECT * FROM `info_tutor_alumno` ORDER BY `info_tutor_alumno`.`nombre` ASC', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getAlumnos = async (req, res) => {
    dbconnect.query('SELECT alumno.idAlumno, alumno.nombre, alumno.apellido, alumno.fechaNacimiento, alumno.fotografia, `alumno-grupo`.`idGrupo`, grupo.nombre AS nombregrupo  FROM `alumno`, `alumno-grupo`, `grupo` WHERE `alumno-grupo`.`idAlumno` = alumno.idAlumno AND `grupo`.`idGrupo` = `alumno-grupo`.`idGrupo` ORDER BY `alumno`.`nombre` ASC', (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getAlumno = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT alumno.idAlumno, alumno.nombre, alumno.apellido, alumno.fechaNacimiento, alumno.fotografia FROM alumno, `tutor-alumno`, tutor WHERE alumno.idAlumno = `tutor-alumno`.`idAlumno` AND tutor.idTutor = `tutor-alumno`.`idTutor` AND tutor.idTutor = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const editaAlumno = async (req, res) => {
    const { idal, nombrealu, apellidoalu, nacimiento, foto, grupo } = req.body;
    if(!idal || !nombrealu || !apellidoalu || !nacimiento || !foto || !grupo){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('UPDATE alumno SET nombre = ?, apellido = ?, fechaNacimiento = ?, fotografia = ? WHERE idAlumno = ?', [nombrealu, apellidoalu, nacimiento, foto, idal], (err, re) => {
        if(err)
            console.log(err)
        else{
            dbconnect.query('UPDATE `alumno-grupo` SET `idGrupo` = ? WHERE `idAlumno` = ?', [grupo, idal], (erro, reso) => {
                if(erro)
                    console.log(erro)
                else{
                reso.message = "Se ha actualizado la información!"
                return res.status(200).json(reso)
                }
            })
        }
    })
}

const editaTutor = async (req, res) => {
    const { idtut, nombretut, password, confpassword } = req.body;
    if(!idtut || !nombretut){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        bcrypt.hash(password, salty, function(err, hash) {
        dbconnect.query('UPDATE tutor SET usuario = ?, contrasenia = ? WHERE idTutor = ?', [nombretut, hash, idtut], (e, r) => {
            if(e)
                console.log(e)
            else{
                r.message = "Se ha actualizado la información!"
                return res.status(200).json(r)
            }
            })
        })
    }
    else if(password === ""){
        dbconnect.query('UPDATE tutor SET usuario = ? WHERE idTutor = ?', [nombretut, idtut], (e, r) => {
            if(e)
                console.log(e)
            else{
                r.message = "Se ha actualizado la información!"
                return res.status(200).json(r)
            }
        })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}

const editaAdmin = async (req, res) => {
    const { idadmin, nombread, password, confpassword } = req.body;
    if(!idadmin || !nombread || !password || !confpassword){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    if(password !== confpassword){
        return res.status(403).send({ success: false, message: 'Contraseñas deben ser iguales'})
    }
    if(isPassValid(password)){
        bcrypt.hash(password, salty, function(e, hash) {
            dbconnect.query('UPDATE admin SET usuario = ?, contrasenia = ? WHERE idAdministrador = ?', [nombread, idadmin], (er, re) => {
                if(er)
                    console.log(er)
                else{
                    re.message = "Se ha actualizado la información!"
                    return res.status(200).json(re)
                }
            })
        })

    }
    else if(password === ""){
        dbconnect.query('UPDATE admin SET usuario = ? WHERE idAdministrador = ?', [nombread, idadmin], (e, r) => {
            if(e)
                console.log(e)
            else{
                r.message = "Se ha actualizado la información!"
                return res.status(200).json(r)
            }
            })
    }
    else{
        return res.status(400).send({ success: false, message: 'La contraseña debe tener un dígito, una letra minuscula, una letra mayúscula, un caracter especial, y una longitud de más de 8 caracteres'})
    }
}


const borraTutor = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT idAlumno FROM `tutor-alumno` WHERE idTutor = ?', [id], (error, re, fields) => {
        if(error)
            console.log(error)
        else{
            dbconnect.query('DELETE FROM tutor WHERE idTutor = ?', [id], (er, resp) => {
                if(er)
                    console.log(er)
                else{
                    dbconnect.query('DELETE FROM alumno WHERE idAlumno = ?', [re[0].idAlumno], (err, resonse, fields) => {
                        if(err)
                            console.log(err)
                        else{
                            dbconnect.query('SELECT idTutor FROM tutor', (erro, reso, fields) => {
                                if(erro)
                                    console.log(erro)
                                else{
                                    for(let i = 1; i<=reso.length; i++){
                                        dbconnect.query('UPDATE tutor SET idTutor = '+i+' WHERE idTutor = '+reso[i-1].idTutor, (err, reson, fields) => {
                                            if(err)
                                                console.log(err)
                                            })
                                        }
                                    }
                                    dbconnect.query('SELECT idAlumno FROM alumno', (erro, reso, fields) => {
                                        if(erro)
                                            console.log(erro)
                                        else{
                                            for(let i = 1; i<=reso.length; i++){
                                                dbconnect.query('UPDATE alumno SET idAlumno = '+i+' WHERE idAlumno = '+reso[i-1].idAlumno, (err, reson, fields) => {
                                                    if(err)
                                                        console.log(err)
                                                })
                                            }
                                        }
                                    })
                                    reso.message = "Tutor/Alumno borrado exitosamente!";
                                    return res.status(200).json(reso)
                                }
                            )}
                    })
                }
            })
        }
    })
}

const borraAdmin = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM admin WHERE idAdministrador = ?', [id], (error, response) => {
    if(error)
        console.log(error)
    else{
        response.message = "Administrador borrado exitosamente!"
        dbconnect.query('SELECT idAdministrador FROM admin', (erro, resonse) => {
            if(erro)
                console.log(erro)
            else{
                for(let i = 1; i<=resonse.length; i++){
                    dbconnect.query('UPDATE admin SET idAdministrador = '+i+' WHERE idAdministrador = '+resonse[i-1].idAdministrador, (err, resose, fields) => {
                        if(err)
                            console.log(err)
                    })
                }
            }
        })
        return res.status(200).json(response)
    }
    })
}

const borraHito = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('DELETE FROM hito WHERE idHito = ?', [id], (error, response) => {
    if(error)
        console.log(error)
    else{
        response.message = "Hito borrado exitosamente!"
        dbconnect.query('SELECT idHito FROM hito', (erro, resonse) => {
            if(erro)
                console.log(erro)
            else{
                for(let i = 1; i<=resonse.length; i++){
                    dbconnect.query('UPDATE hito SET idHito = '+i+' WHERE idHito = '+resonse[i-1].idHito, (err, resose) => {
                        if(err)
                            console.log(err)
                    })
                }
            }
        })
        return res.status(200).json(response)
    }
    })
}

const editaHito = async (req, res) => {
    const { idh, timestamp, desc } = req.body;
    if(!idh || !timestamp || !desc){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('UPDATE hito SET descripcion = ? WHERE idHito = ?', [desc, idh], (er, resp) => {
        if(er)
            console.log(er)
        else{
            dbconnect.query('UPDATE `alumno-hito` SET fecha = ? WHERE idHito = ?', [timestamp, idh], (err, respo) => {
                if(err)
                    console.log(err)
                else{
                    respo.message = "Se ha actualizado la información!";
                    return res.status(200).json(respo);
                    }
            })
        }
    })
}

const ingresaHito = async (req, res) => {
    const { ida, desc } = req.body;
    if(!ida || !desc){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT idHito FROM hito', (er, resp) => {
        if(er)
            console.log(er)
        else{
            dbconnect.query('INSERT INTO hito (idHito, descripcion) VALUES (?, ?)', [resp.length+1, desc], (err, respo) => {
                if(err)
                    console.log(err)
                else{
                    dbconnect.query('INSERT INTO `alumno-hito`(idHito, idAlumno, fecha) VALUES (?,?, CURRENT_TIMESTAMP())', [resp.length+1, ida], (erro, respos) => {
                        if(erro)
                            console.log(erro)
                        else{
                            respos.message = "Nuevo hito registrado!";
                            return res.status(200).json(respos);
                        }
                    })
                }
            })
        }
    })

}

const getHitosAlumno = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT `alumno-hito`.idHito, `alumno-hito`.fecha, hito.descripcion FROM `alumno-hito`, hito WHERE `alumno-hito`.`idHito` = hito.idHito AND idAlumno = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

const getHitosDisplayPadre = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT hito.idHito,`alumno-hito`.fecha, hito.descripcion, alumno.idAlumno, alumno.nombre, tutor.idTutor FROM hito,`alumno-hito`,alumno, `tutor-alumno`, tutor WHERE hito.idHito = `alumno-hito`.`idHito` AND `alumno-hito`.`idAlumno` = alumno.idAlumno AND alumno.idAlumno = `tutor-alumno`.`idAlumno` AND `tutor-alumno`.`idTutor` = tutor.idTutor', (err, response) => {
        if(err)
            console.log(err)
        else{
            res.send(response);
        }
    })
}

const getAlumnosGrupo = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT alumno.idAlumno, alumno.nombre FROM `alumno-grupo`, alumno WHERE `alumno-grupo`.`idAlumno` =  alumno.idAlumno AND `alumno-grupo`.`idGrupo` = ?', [id], (error, response) => {
        if(error)
            console.log(error)
        else{
            res.send(response);
        }
    })
}

function isPassValid(str) {
    return /^(?=.*[0-9])(?=.*[#"!/()=?¿¡{}_$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(str);
}

module.exports = { ingresaTutor, ingresaAdmin, getGrupos, getAdmins, getAdmin, getTutores, getAlumnos, getAlumno, editaAlumno, editaTutor, editaAdmin, borraTutor, borraAdmin, ingresaHito, borraHito, editaHito, getHitosAlumno, getHitosDisplayPadre, getAlumnosGrupo }