const User = require('../models/user');
const {messages,statusCode} = require('../messages.json');

const searchUser = async(req,res) => {
    try {
        if(!req.query.search) {
            return res.status(statusCode.OK).send([]);
        }
        const keyword = new RegExp(req.query.search,'i');
        const query = {
            $or:[
                {
                    name:keyword
                },
                {
                    contact:keyword
                }
            ]
        }
        const user =  await User.find(query).select({name:1,contact:1,_id:0});
        if(!user.length) {
            return res.status(statusCode.OK).send([]);
        }
        return res.status(statusCode.OK).send(user);
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER).send({message:messages.SOMETHING_WENT_WRONG})
    }
}

module.exports = {
    searchUser
}