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
        const payload = jwt.verify(token, authConfig.secret);
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
        res.send(error)
    };
}



//create new user clientAdmin
//http://localhost:5000/users
ClientAdminUsersController.clientAdminCreateUser = (req, res) => {
    //read data from request
    let data = {
        name,
        email,
        password,
        authorizationLevel
    } = req.body;
    
    if (data.authorizationLevel < 1 && data.authorizationLevel > 3) {
        return res.send(
            "Sólo puedes crear Users de nivel 1 al 3"
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
        User.findOne({ where: { email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel === 3) {
                    //controller function
                    User.findOne({ where: { email: email } })
                        .then(repeatedData => {
                            console.log(repeatedData)
                            if (repeatedData == null) {
                                User.create({
                                    name: data.name,
                                    email: data.email,
                                    password: data.password,
                                    authorizationLevel: data.authorizationLevel
                                }).then(User => {
                                    res.send(`Bienvenido, ${User.name}`);
                                }).catch((error) => {
                                    res.send(`Ha ocurrido el siguiente error ${error}`);
                                });
                            } else {
                                res.send("El User con este e-mail ya existe en nuestra base de datos");
                            }
                        })
                        .catch(error => {
                            res.send(`Ha ocurrido el siguiente error: ${error}`)
                        });
                } else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            }).catch(error => {
                res.send(`Ha ocurrido el siguiente error: ${error}`)
            });
    } catch (error) {
        res.send(error)
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
        return res.send(
            "Sólo puedes actualizar Users de nivel 1 al 3"
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
                if (found.authorizationLevel === 3) {
                    //controller function
                    User.update(data, {  where: { email: email  } })
                        .then(updated => {
                            res.send(updated)
                        })
                        .catch((error) => {
                            res.send(`Ha ocurrido el siguiente error ${error}`);
                        });
                } else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            }).catch(error => {
                res.send(`No se ha encontrado tu usuario, error : ${error}`)
            });
    } catch (error) {
        res.send(error)
    };
}



//delete user by email clientAdmin
//http://localhost:5000/users/:email
ClientAdminUsersController.clientAdminDeleteUser = (req, res) => {
    //read data from request
    const email = req.body.email;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        User.findOne({ where: {  email: payload.user.email } })
            .then(found => {
                if (found.authorizationLevel === 3) {
                    //controller function
                    User.findOne({  where: {  email: email } })
                        .then(data => {
                            if (data.authorizationLevel > 1 && data.authorizationLevel < 3) {
                                User.destroy({  where: { email: email  },  truncate : false })
                                    .then(() => {
                                        res.send(`El usuario con la email ${email} ha sido eliminado`)
                                    })
                                    .catch((error) => {
                                        res.send(`Ha ocurrido el siguiente error ${error}`);
                                    });
                            } else {
                                res.send("Sólo puedes eliminar un User de nivel 1 al 3")
                            }
                        }).catch(() => {
                            res.send(`Este usuario que quieres eliminar no existe`)
                        });
                } else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            }).catch(error => {
                res.send(`Ha ocurrido el siguiente error: ${error}`)
            });
    } catch (error) {
        res.send(error)
    };
}

module.exports = ClientAdminUsersController;