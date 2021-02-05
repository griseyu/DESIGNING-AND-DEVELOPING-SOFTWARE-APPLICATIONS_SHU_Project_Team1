const mongoose = require('mongoose');
const passportlocalmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
    username: String,
    password: String
});

const User = mongoose.Model("Users", regSchema);
UserSchema.plugin(passportlocalmongoose);

//export to 

module.exports = mongoose.model("User", userSchema);