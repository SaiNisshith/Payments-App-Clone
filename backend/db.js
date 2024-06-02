const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    firstName : String,
    lastName : String,
    password :String
});

let User = mongoose.model('Users',userSchema);

let accountsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    balance : Number
})

let Accounts = mongoose.model('Accounts',accountsSchema);
module.exports = {
    User,
    Accounts
};