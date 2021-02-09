// const mongoose = require('mongoose');
// const passportlocalmongoose = require("passport-local-mongoose");

// const UserSchema = new mongoose.Schema ({
//     username: String,
//     password: String
// });

// const User = mongoose.model("Users", UserSchema);
// UserSchema.plugin(passportlocalmongoose);

// //export to 

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
        username: { type: String, required: true, unique: true },
        // email: {type: email, required: true, unique: true},
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model