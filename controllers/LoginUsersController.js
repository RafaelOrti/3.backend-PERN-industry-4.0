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
        return res.send({
            msg:"invalid password"
        });
    }else{
        password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    }; 

    User.findOne({ where: { email: email } })
    .then(repeatedData => {
        if (repeatedData == null) {
            User.create({
                name: name,
                email: email,
                password: password,
                authorizationLevel:1

            }).then(User=> {

                const token = jwt.sign({
                    user: User
                }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                //console.log("token",User);
                res.send({
                    msg:"Welcome",
                    token: token,
                    user: User.dataValues
                });

            })
            .catch((error) => {
                res.send({
                    msg:`DB error`});
            });
            
        } else {
            res.send({
                msg:`this user already exists`});
        }
    }).catch(error => {
        res.send({
            msg:`DB error`})
    });

}

//log in
//http://localhost:5000/users/login
LoginUsersController.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
            where: {  email: email   }
        })
        .then(User => {

            if (User) {
                //console.log("66666",User);
                if (bcrypt.compareSync(password, User.password)) {
                    const token = jwt.sign({
                        user: User
                    }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    //console.log("666668",token);
                    res.send({
                        msg:"Welcome",
                        token: token,
                        user: User
                    });
                } else {
                        res.send({
                            msg:`Incorrect password`});
                }
            } else {
                res.send({
                    msg:"User does not exist"});
            }
        }).catch(error => {
            res.send({
                msg:`DB error`})
        });
}
 

module.exports = LoginUsersController;