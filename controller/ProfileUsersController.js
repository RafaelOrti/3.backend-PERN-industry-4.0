const authConfig = require("../config/auth");
const {
    User
} = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    Op
} = require("sequelize");
const ProfileUsersController = {};





//USERS PROFILE VIEW

//read profile
//http://localhost:5000/users/profile
ProfileUsersController.readProfile = async (req, res) => {


    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        Usuario.findOne({ where: { email: payload.email } })
            .then(data => {
                res.send(data)
            })

    } catch (error) {
        res.send(error)
    };
}


//update profile
//http://localhost:5000/users/update
ProfileUsersController.updateProfile = async (req, res) => {
    const data = {
        name,
        email,
        password
    } = req.body;
    data.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        User.update(data, { where: { email: payload.email } })
            .then(updated => {
                res.send(updated)
            })

    } catch (error) {
        res.send(`Ha ocurrido el siguiente error ${error}`)
    }
}


//delete user by email
//http://localhost:5000/users/delete
ProfileUsersController.deleteUser = async (req, res) => {

    try {
        const token = req.body.emailToken;
        const payload = jwt.verify(token, authConfig.secret);
        User.destroy({ where: { email: payload.email } })
            .then(deleted => {
                res.send(deleted)
            })

    } catch (error) {
        res.send(`Ha ocurrido el siguiente error ${error}`)
    }
}
