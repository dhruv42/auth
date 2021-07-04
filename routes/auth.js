const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');
const {messages,statusCode} = require('../messages.json');

const login = async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(statusCode.NOT_FOUND).send({message:messages.USER_NOT_FOUND});
        }
        if(bcryptjs.compareSync(req.body.password,user.password)){
            return res.status(statusCode.OK).json({
                id:user.id,
                token:generateToken(user.id)
            });
        }
        return res.status(statusCode.NOT_FOUND).send({message:messages.USER_NOT_FOUND});
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER).send({message:messages.SOMETHING_WENT_WRONG});
    }
}


const signup = async (req,res) => {
    try {
        const existingUser = await User.findOne({
            $or:[
                {
                    email:req.body.email
                },
                {
                    contact:req.body.contact
                }
            ]
        });

        if(existingUser){
            return res.status(statusCode.BAD_REQUEST).send({message:messages.USER_ALREADY_EXISTS});
        }
        const passwordHash = bcryptjs.hashSync(req.body.password)
        await User.create({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:passwordHash,
            address:req.body.address,
            gender:req.body.gender.toLowerCase(),
            country:req.body.country
        });
        return res.status(statusCode.CREATED).send({message:messages.USER_CREATED});
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER).send({message:messages.SOMETHING_WENT_WRONG});
    }
}


const logout = async (req,res) => {
    try {
        __loggedOutTokens.set(req.headers.authorization,1,3600);
        return res.status(statusCode.OK).send({message:messages.LOGGED_OUT});
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER).send({message:messages.SOMETHING_WENT_WRONG});
    }
}

function generateToken(id) {
    return jwt.sign({userId:id},config.tokenSecret,{expiresIn:'1h'});
}

module.exports = {
    login,signup,logout
}