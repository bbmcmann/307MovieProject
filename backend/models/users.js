const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema( {
    //Id: mongoose.isObjectIdOrHexString,
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
    // favorite_pun
}, {collection : 'users_list'});

module.exports = UserSchema;