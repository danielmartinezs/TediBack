const express = require('express');
const bcrypt = require('bcryptjs');
const dbconnect = require('../config/dbConnection.js');
const jwt = require('jsonwebtoken');
const { application } = require('express');
const salty = 10;

const login = async (req, res) => {
    const { user, password, role } = req.body;
    if(!user || !password || !role){
        return res.status(400).send({ success: false, message: 'No puedes dejar campos vacíos'})
    }
    dbconnect.query('SELECT * FROM `'+role+'` WHERE usuario = ?', [user], (err, response) => {
        if(err) 
            console.log(err)
        else if(response.length === 0){
            return res.status(403).send({ success: false, message: 'Usuario inexistente'})
        }
        else{
            bcrypt.compare(password, response[0].contrasenia, (er, result) => {
                if(er)
                    console.log(er)
                if(result){
                    var id;
                    if(role == "tutor"){
                        id = response[0].idTutor;
                    }
                    else{
                        id = response[0].idAdministrador;
                    }
                    const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'30s' } )
                    return res.status(200).json({id: id, role: role, token: token})
                }
                else{
                    return res.status(403).send({ success: false, message: 'Contraseña incorrecta'})
                }
            })
        }
    })
}

const hashpass = async (req, res) => {
    const { id } = req.params;
    dbconnect.query('SELECT * FROM admin WHERE idAdministrador = ?', [id], (err, response, fields) => 
    {
        if(err) 
            console.log(err)
        else{
                bcrypt.hash(response[0].contrasenia, salty, function(err, hash) {
                dbconnect.query('UPDATE admin SET contrasenia ="'+hash+'" WHERE idAdministrador ='+id, (er, resonse, field) => {
                    if(er)
                        console.log(er)
                    else{
                        res.json(resonse)
                    }
                })
            })
        }
    });
}

module.exports = { login, hashpass }