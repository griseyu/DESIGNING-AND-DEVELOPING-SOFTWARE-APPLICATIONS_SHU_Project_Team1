// const express = require("express"), 
//     mongoose = require("mongoose"), 
//     passport = require("passport"), 
//     bodyParser = require("body-parser"), 
//     LocalStrategy = require("passport-local"), 
//     passportLocalMongoose = require("passport-local-mongoose"), 
//     User = require("./models/user"); 

//     mongoose.set('useNewUrlParser', true); 
//     mongoose.set('useFindAndModify', false); 
//     mongoose.set('useCreateIndex', true); 
//     mongoose.set('useUnifiedTopology', true); 
//     mongoose.connect("mongodb://localhost/ddsa_project");


// var app = express(); 
// app.set("view engine", "ejs"); 
// app.use(bodyParser.urlencoded({ extended: true }));
  
// app.use(require("express-session")({ 
//     secret: "Execute order 66",  //this is used to hash/salt our passwords in the database - this can be your own phrase
//     resave: false, 
//     saveUninitialized: false
// })); 
  
// app.use(passport.initialize()); 
// app.use(passport.session()); 

// passport.use(new LocalStrategy(User.authenticate())); 
// passport.serializeUser(User.serializeUser()); 
// passport.deserializeUser(User.deserializeUser()); 
  
// //===================== 
// // ROUTES 
// //These should be in their own file and folder in a full blown solution/assignment
// //===================== 
  
// // Showing home page 
// app.get("/", function (req, res) { 
//     res.render("home"); 
// }); 
  
// // Showing secret page 
// app.get("/secret", isLoggedIn, function (req, res) { 
//     res.render("secret"); 
// }); 
  
// // Showing register form 
// app.get("/register", function (req, res) { 
//     res.render("register"); 
// }); 
  
// // Handling user signup 
// app.post("/register", function (req, res) { 
//     var username = req.body.username 
//     var password = req.body.password 
//     User.register(new User({ username: username }), 
//             password, function (err, user) { 
//         if (err) { 
//             console.log(err); 
//             return res.render("register"); 
//         } 
  
//         passport.authenticate("local")( 
//             req, res, function () { 
//             res.render("secret"); 
//         }); 
//     }); 
// }); 
  
// //Showing login form 
// app.get("/login", function (req, res) { 
//     res.render("login"); 
// }); 
  
// //Handling user login 
// app.post("/login", passport.authenticate("local", { 
//     successRedirect: "/secret", 
//     failureRedirect: "/login"
// }), function (req, res) { 
// }); 
  
// //Handling user logout  
// app.get("/logout", function (req, res) { 
//     req.logout(); 
//     res.redirect("/"); 
// }); 
  
// function isLoggedIn(req, res, next) { 
//     if (req.isAuthenticated()) return next(); 
//     res.redirect("/login"); 
// } 
  
// var port = process.env.PORT || 3000; //An alternative way of assigning a port number
// app.listen(port, function () { 
//     console.log("The server has started on port", port); 
// }); 


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://localhost:27017/ddsa-login-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.use(
    cors({
      origin: 'http://localhost:9999',
      credentials: true,
    })
  );

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 7) {
		return res.json({
			status: 'error',
			error: 'Password is too short! 8+ characters pls'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 7) {
		return res.json({
			status: 'error',
			error: 'Password is too short! 8+ characters pls'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})