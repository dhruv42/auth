const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    address:[
        {
            flat:String,
            building:String,
            street:String,
            zipcode:String,
            city:String,
            state:String,
            country:String
        }
    ],
    contact:{
        type:String,
        required:false
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:'createdAt',
        updatedAt:'updatedAt'
    }
});

module.exports = new mongoose.model("User",userModel);