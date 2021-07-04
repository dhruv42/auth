const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {messages,statusCode} = require('../messages.json');

exports.verify = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token) res.status(statusCode.UNAUTHORIZED).send({message:messages.NO_TOKEN});

    if(__loggedOutTokens.get(token)){
        return res.status(statusCode.UNAUTHORIZED).send({message:messages.TOKEN_EXPIRED});
    }

    else {
        jwt.verify(token,config.tokenSecret,(err,value) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(statusCode.UNAUTHORIZED).send({message:messages.TOKEN_EXPIRED});
                }
                return res.status(statusCode.UNAUTHORIZED).send({messages:messages.INVALID_TOKEN})
            }
            next();
        })
    }
}