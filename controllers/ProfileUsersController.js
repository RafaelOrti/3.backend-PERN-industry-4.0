const authConfig = require("../config/auth");
const { User } = require("../models/index");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProfileUsersController = {};





//USERS PROFILE VIEW

//read profile
//http://localhost:5000/users/profile
ProfileUsersController.readProfile =  (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        User.findOne({ where: { email: payload.user.email } })
            .then(found => {
                if(found){
                    res.send(`El usuario con el email ${payload.user.email} ha sido encontrado`)
                }else{
                    res.send(`No se ha encontrado tu usuario por favor consulta con servicio técnico`)
                }
            }).catch(error => {
                res.send(error)
            })
    } catch (error) {
        res.send(error)
    };
}


//update profile
//http://localhost:5000/users/update
ProfileUsersController.updateProfile =  (req, res) => {

    let data ={
        name,
        email,
        password
    } = req.body;

    if (/^([a-zA-Z0-9@*#.,]{8,15})$/.test(req.body.password) !== true) {
        return res.send(
            "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,"
        );
    }else{
        data.password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    }; 


    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        User.update(data, { where: { email: payload.user.email } })
            .then(updated => {
                if(updated){
                res.send(`El usuario con el email ${payload.user.email} ha sido actualizado ${updated}`)
                }else{
                    res.send(`No se ha encontrado tu usuario por favor consulta con servicio técnico`)
                }
            }).catch(error => {
                res.send(error)
            })

    } catch (error) {
        res.send(`Ha ocurrido el siguiente error ${error}`)
    }
}
 

//delete user by email
//http://localhost:5000/users/delete
ProfileUsersController.deleteProfile = (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, authConfig.secret);
        User.destroy( { where: { email: payload.user.email },
            truncate : false })
            .then(deleted => {
                if(deleted){
                res.send(`El usuario con el email ${payload.user.email} ha sido eliminado ${deleted}`)
                }else{
                    res.send(`No se ha encontrado tu usuario por favor consulta con servicio técnico`)
                }
            }).catch(error => {
                res.send(error)
            })
    } catch (error) {
        res.send(`Ha ocurrido el siguiente error ${error}`)
    }
}
            
module.exports = ProfileUsersController;
