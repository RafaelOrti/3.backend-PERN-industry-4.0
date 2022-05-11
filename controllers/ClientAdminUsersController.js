const authConfig = require("../config/auth");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const ClientAdminUsersController = {};



//clientAdmin PROFILE VIEW


//read users clientAdmin
//http://localhost:5000/users
ClientAdminUsersController.clientAdminReadUsers = (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const payload = jwt.verify(token, authConfig.secret);
        console.log("4444",payload)
        User.findOne({ where: { email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel === 3) {
                    //controller function
                    User.findAll({
                            where: {
                                authorizationLevel: {
                                    [Op.or]: [1, 2, 3]
                                }
                            }
                        })
                        .then(data => {
                            res.send(data)
                        }).catch(error => {
                            res.send(error)
                        })
                } else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            }).catch(error => {
                res.send(`Ha ocurrido el siguiente error: ${error}`)
            });
    } catch (error) {
        res.send({ 
            msg: `DB error`})
    };
}



//create new user clientAdmin
//http://localhost:5000/users
ClientAdminUsersController.clientAdminCreateUser = (req, res) => {
    //read data from request
    console.log("eeeeeeeee",req.body)
    let data = {
        name,
        email,
        password,
        authorizationLevel
    } = req.body;
    
    if (data.authorizationLevel < 1 && data.authorizationLevel > 3) {
        return res.send({ 
            msg: "Only users with 1 to 3 allowed"
        }
        );
    }
    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(data.password) !== true) {
        return res.send(
            { 
                msg: "invalid password"}
        );
    };
    data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    //clientAdmin authorization verification
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        console.log("repeatedData",payload)
        console.log("repeatedData",data)
        User.findOne({ where: { email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel >= 3) {
                    //controller function
                    User.findOne({ where: { email: data.email } })
                        .then(repeatedData => {
                            
                            if (repeatedData == null) {
                                User.create({
                                    name: data.name,
                                    email: data.email,
                                    password: data.password,
                                    authorizationLevel: data.authorizationLevel
                                }).then(User => {
                                    res.send({ 
                                        msg: `Welcome`});
                                }).catch((error) => {
                                    res.send({ 
                                        msg: `DB error`});
                                });
                            } else {
                                res.send({ 
                                    msg: "this user already exists"});
                            }
                        })
                        .catch(error => {
                            res.send({ 
                                msg: `DB error`})
                        });
                } else {
                    res.send({ 
                        msg: "No deberías de estar aquí"})
                    //nodemailer
                }
            }).catch(error => {
                res.send({ 
                    msg: `DB error`})
            });
    } catch (error) {
        res.send({ 
            msg: `DB error`})
    };
}


//update profile by email clientAdmin
//http://localhost:5000/users/email/:email
ClientAdminUsersController.clientAdminUpdateUser = (req, res) => {
    //read data from request
    let data = {
        name,
        email,
        password,
        authorizationLevel
    } = req.body;
    
    if (data.authorizationLevel < 1 && data.authorizationLevel > 3) {
        return res.send({
            msg:"you only can update 1 to 3 level user"}
        );
    }
    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(data.password) !== true) {
        return res.send(
            "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y utilizar simbolor alphanumericos y de puntuación."
        );
    };
    data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    //clientAdmin authorization verification
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        console.log(payload.user.email)
        User.findOne({ where: { email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel >= 3) {
                    //controller function
                    User.update(data, {  where: { email: email  } })
                        .then(updated => {
                            res.send({ 
                                msg: `updated`})
                        
                        
                        })
                        .catch((error) => {
                            res.send({ 
                                msg: `DB error`})
                        
                        });
                } else {
                    res.send({msg:"No deberías de estar aquí"})
                    //nodemailer
                }
            }).catch(error => {
                res.send({msg:"this user doesnt exists"})
            });
    } catch (error) {
        res.send({ 
            msg: `DB error`})
    };
}



//delete user by email clientAdmin
//http://localhost:5000/users/:email
ClientAdminUsersController.clientAdminDeleteUser = (req, res) => {
    //read data from request
    console.log("bolsillo",req)
    const email = req.body.email;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        console.log("bolsillo",payload.user.email)
        User.findOne({ where: {  email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel >= 3) {
                    //controller function
                    User.findOne({  where: {  email: email } })
                        .then(data => {
                            console.log("44444",data)
                            if (data.authorizationLevel >= 1 && data.authorizationLevel <= 3) {
                                console.log("44444",email)
                                User.destroy({  where: { email: email  },  truncate : false })
                                    .then(() => {
                                        res.send({ 
                                            msg: `deleted`})
                                    })
                                    .catch((error) => {
                                        console.log("4444444444")
                                        res.send({ 
                                            msg: `DB error`})
                                    });
                            } else {
                                res.send({  msg:"you only can delete 1 to 3 level user"})
                            }
                        }).catch(error => {
                            res.send({msg:"User does not exists"})
                        });
                } else {
                    res.send({msg:"No aqui"})
                    //nodemailer
                }
            }).catch(error => {
                console.log("555555555")
                res.send({ 
                    msg: `DB error`})
            });
    } catch (error) {
        console.log("66666666")
        res.send({ 
            msg: `DB error`})
    };
}

module.exports = ClientAdminUsersController;