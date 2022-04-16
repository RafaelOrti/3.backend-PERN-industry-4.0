
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    //token taked
    let token = req.headers.authorization.split(' ')[1];
    //decode token and make an object
    let {usuario} = jwt.decode(token,authConfig.secret)

    try{
        if(usuario.authorizationLevel === 5){
            next();
        }else{
            res.status(403).send({msg:`User is not allowed.`})
            //nodemailer
        }
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:`Something had happened, try to check thue infos you put and try again.`,
                error:error
        });
    }

    
};


