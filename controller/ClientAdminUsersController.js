const authConfig = require("../config/auth");
const {
    User
} = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    Op
} = require("sequelize");
const ClientAdminUsersController = {};



//clientAdmin PROFILE VIEW


//read users clientAdmin
//http://localhost:5000/users
ClientAdminUsersController.clientAdminReadUsers = async (req, res) => {

    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        let = autorizationLevel;
        User.findOne({ where: { email: payload.email } })
            .then(data => {
                authorizationLevel = data.authorizationLevel;
                if (authorizationLevel === 3) {
                    //controller function
                    User.findAll({
                        where : { authorizationLevel : 3 || 2 || 1 },
                    })
                    .then(data => {
                        res.send(data)
                    })
                } else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            })
    } catch (error) {
        res.send(error)
    };
}



//create new user clientAdmin
//http://localhost:5000/users
ClientAdminUsersController.clientAdminCreateUser = async (req, res) => {
    //read data from request
    const {
        name,
        email,
        password,
        authorizationLevel
    } = req.body;
    password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    if (authorizationLevel !== 3 || 2 || 1) {
        return res.send(
            "Sólo puedes crear Users de nivel 1 al 3"
        );
    };
    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(req.body.password) !== true) {
        return res.send(
            "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y utilizar simbolor alphanumericos y de puntuación."
        );
    };
    //clientAdmin authorization verification
    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        let = autorizationLevel;
        User.findOne({ where: { email: payload.email } })          
        .then(data => {
            authorizationLevel = data.authorizationLevel;
            if (authorizationLevel === 3) {
                //controller function
                User.findOne({ where : { email : email }})
                .then(repeatedData => {
                    if (repeatedData == 0) {
                        User.create({
                            name: name,
                            email: email,
                            password: password,
                            authorizationLevel: authorizationLevel
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
        })
    } catch (error) {
        res.send(error)
    };
}


//update profile by email clientAdmin
//http://localhost:5000/users/email/:email
ClientAdminUsersController.clientAdminUpdateUser = async (req, res) => {
    //read data from request
    const {
        name,
        email,
        password,
        authorizationLevel
    } = req.body;
    password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    if (authorizationLevel !== 3 || 2 || 1) {
        return res.send(
            "Sólo puedes editar Users de nivel 1 al 3"
        );
    };
    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(req.body.password) !== true) {
        return res.send(
            "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y utilizar simbolor alphanumericos y de puntuación."
        );
    };
    //clientAdmin authorization verification
    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        let = autorizationLevel;
        User.findOne({ where: { email: payload.email } })
            .then(data => {
                authorizationLevel = data.authorizationLevel;
                if (authorizationLevel === 3) {
                    //controller function
                    User.update({
                        name: name,
                        email: email,
                        password: password,
                        authorizationLevel: authorizationLevel
                    }, { where: { email: email } })
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
            })
    } catch (error) {
        res.send(error)
    };
}



//delete user by email clientAdmin
//http://localhost:5000/users/:email
ClientAdminUsersController.clientAdminDeleteUser = async (req, res) => {
    //read data from request
    const {
        email
    } = req.body;
    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        let = autorizationLevel;
        User.findOne({ where: { email: payload.email } })
            .then(data => {
                authorizationLevel = data.authorizationLevel;
                if (authorizationLevel === 3) {
                    //controller function
                    User.findOne({ where: { email: email } })
                    .then(data => {
                        if(data.authorizationLevel === 1 || 2 || 3)
                        {
                        User.destroy({ where: { email: email } })
                            .then(deleted => {
                                res.send(deleted)
                            })
                            .catch((error) => {
                                res.send(`Ha ocurrido el siguiente error ${error}`);
                            });
                        } else {
                            res.send("Sólo puedes eliminar un User de nivel 1 al 3")
                        }
                    })
                }else {
                    res.send("No deberías de estar aquí")
                    //nodemailer
                }
            })
    } catch (error) {
        res.send(error)
    };
}