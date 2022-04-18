const authConfig = require("../config/auth");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginUsersController = {};

//CONTROLLER USERS

//FIRST VIEW LOGIN

    
//register users
//http://localhost:5000/users/register
LoginUsersController.register = (req, res) => {

    const name=req.body.name;
    const email=req.body.email;
    let password= req.body.password;

    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(req.body.password) !== true) {
        return res.send(
            "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,"
        );
    }else{
        password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    }; 

    User.findOne({ where: { email: email } })
    .then(repeatedData => {
        if (repeatedData == null) {
            User.create({
                name: name,
                email: email,
                password: password
            }).then(User => {
                res.send(`Bienvenido, ${User.name}`);
            }).catch((error) => {
                res.send(`db error ${error}`);
            });
        } else {
            res.send(`El User con este e-mail ya existe en nuestra base de datos`);
        }
    }).catch(error => {
        res.send(`db error: ${error}`)
    });

}

//log in
//http://localhost:5000/users/login
LoginUsersController.login = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
            where: {  email: email   }
        })
        .then(User => {
            if (User) {
                if (bcrypt.compareSync(password, User.password)) {
                    const token = jwt.sign({
                        user: User
                    }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.send({
                        token: token,
                        user: User
                    });
                } else {
                    res.status(401).send("Contraseña incorrecta");
                }
            } else {
                res.send("El User no existe");
            }
        }).catch(error => {
            res.send(`db error: ${error}`)
        });
}
 

module.exports = LoginUsersController;