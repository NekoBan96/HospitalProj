
const userModel = require("../models/usersModel");
const hashHelper = require("../helpers/hashHelper");
const jwt = require('jsonwebtoken')
const { log } = require('console');
const {secret} = require('../config')

exports.add = (req, res) => {
    // username = req.body.login.toString("utf-8")
    email = req.body.email.toString("utf-8")
    password = req.body.pass.toString("utf-8")
    try {
        userModel.useCheck(email)
        .then(result => {
            if (result == "in use") {
                res.status(403).send("email is already in use")
                log('in use')
            }else {
                hashHelper.scryptHash(password)
                .then(hash => {userModel.add(email, hash)
                .then(
                    result => {
                        res.status(201).json({message: "success"})
                        log("created")
                    }, err => res.status(500).json({message: "server error"})
                )
                })
            }
        })
    } catch (err) {res.status(500).json({error: err})}
}

exports.verify  = (req, res) => {
    try {
        email = req.body.email.toString("utf-8")
        pass = req.body.pass.toString("utf-8")
        // console.log(password);
        userModel.getByEmail(email)
        .then(result => {
            if (!result) {return res.json({message: 'Неверный логин или пароль'}).status(400)};
            hashHelper.scryptVerify(pass, result.password)
            .then(isVerif => {
            console.log(isVerif);
            if (isVerif == true) {
                const token = jwt.sign({
                   email: email,
                   userName: result.userName
                },
                secret,
                {
                    expiresIn: '7d'
                })
                res.status(200).json({isVerify: true, token: token})
            } else {
                res.status(403).json({isVerify: "false"})
            }
        })
        }) 
    } catch (err) {console.log(err); res.status(500).json({error: err})}
    
}