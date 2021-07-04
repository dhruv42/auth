const Joi = require('joi');
const {messages,statusCode} = require('../messages.json');

const allSchemas = {
    registerSchema : Joi.object().keys({
        name:Joi.string().trim().required(),
        email:Joi.string().email().required(),
        contact:Joi.string().trim().length(10).pattern(/^[0-9]+$/).required(),
        gender:Joi.string().trim().required().lowercase().valid("male","female","indeterminate","unknown"),
        country:Joi.string().trim().required(),
        password:Joi.number().integer().required().min(6),
        address:Joi.array()
    }).strict(),
    loginSchema : Joi.object().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required().min(6)
    }).strict()
}

module.exports = function inputValidator(schemaName){
    return function (req, res, next) {
    const validationResult = allSchemas[schemaName].validate(req.body);
        if (validationResult && validationResult.error) {
            return res.status(statusCode.VALIDATION).json({
                message:messages.VALIDATION_ERROR,
                details:validationResult.error.details[0].message.replace(/"/g, '')
            })
        }
        next();
    };
}