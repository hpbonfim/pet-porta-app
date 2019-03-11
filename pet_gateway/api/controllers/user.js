const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

exports.user_register = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "email já existe!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Usuário criado!"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.user_login = (req, res, next) => {
    User.find({
            username: req.body.username
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                console.log(user)
                return res.status(401).json()
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Senha Errada"
                    })
                }
                //else
                if (result) {
                    const usuario = {
                        id: user[0]._id,
                        username: user[0].username,
                        name: user[0].name,
                        email: user[0].email,
                    }
                    /*const token = jwt.sign({
                            id: user[0]._id,
                            username: user[0].username,
                            name: user[0].name,
                            email: user[0].email,
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        }
                    )
                    */
                    console.log("access_token: ", user[0]._id, "usuario:", user[0].username)
                    return res.status(200).send(usuario)
                }
                res.status(401).json({
                    message: "Não permitido"
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

}
exports.user_delete = (req, res, next) => {
    User.remove({
            _id: req.params.userId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}