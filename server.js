// include express and create new express object to interact with the express library
const express = require('express');
const app = express();
const path =require('path');
const router = express.Router();
const hairCareQueries = require('./hairCareQueries')
const makeUpQueries = require('./makeUpQueries')
const skinCareQueries = require('./skinCareQueries')

app.use(express.static(path.join(__dirname, '/public')));

// create a route for get requests for the route of our website
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/home.html'));
})

app.get('/makeUp', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/makeUp.html'));
})

app.get('/hairCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/hairCare.html'));
})

app.get('/skinCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/skinCare.html'));
})

app.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/profile.html'));
})

// add the router
app.use('/', router);

// server and routes for singup/login/product dbs 
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./user2')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ddsa-project";

//secret for crypt
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  //changing password
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

//handling login
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

// to login page
app.get('/login', function(req, res){
	res.sendFile('/public/HTML/login.html', {root: __dirname })
})

//to register page
app.get('/register', function(req, res){
	res.sendFile('/public/HTML/registrationForm.html', {root: __dirname })
})

//post data to db for registration and password handling
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

//logout
router.get('/logout',(req,res)=>{
 })
module.exports  = router;

// Opens new page to display the table with the suggested products on
// Sends to an API
app.get('/hairCareResultsAPI', async function (req, res) {
	
	// Check if req.query.hairIngredients is an array
	const hairArray = Array.isArray(req.query.hairIngredients) ? 
	// writes the contents of req.query.hairIngredients to an array to be used in the MongodB query
	req.query.hairIngredients : [req.query.hairIngredients]
	
	// testing line to ensure array is populated -- to be removed
	console.log(hairArray)

		var query = {Content: { $all: hairArray}}
		const hairResults = await hairCareQueries.hairCareQueries.find(query, {_id: 0, product: 1, link: 1})
		res.json(hairResults)


});

app.get('/hairCareResults', function (req,res) {
	res.sendFile(path.join(__dirname+'/public/HTML/hairCareResults.html'));
})



app.get('/skinCareResults', function (req,res) {
	res.sendFile(path.join(__dirname+'/public/HTML/skinCareResults.html'));
})

app.get('/skinCareResultsAPI', async function (req, res) {
		 
	const skinArray = Array.isArray(req.query.skinIngredients) ? 
	req.query.skinIngredients : [req.query.skinIngredients]
	
	console.log(skinArray)
	var query = {Content: { $all: skinArray}}
	const skinResults = await skinCareQueries.skinCareQueries.find(query, {_id: 0, product: 1, link: 1})
	res.json(skinResults)

});

app.get('/makeUpResults', function (req,res) {
	res.sendFile(path.join(__dirname+'/public/HTML/makeUpResults.html'));
})

app.get('/makeUpResultsAPI', async function (req, res) {
		 
	const makeUpArray = Array.isArray(req.query.makeUpIngredients) ? 
	req.query.makeUpIngredients : [req.query.makeUpIngredients]
	
	console.log(makeUpArray)
	var query = {Content: { $all: makeUpArray}}
	const makeUpResults = await makeUpQueries.makeUpQueries.find(query, {_id: 0, product: 1, link: 1})
	res.json(makeUpResults)

});

// listen on port 3000 and return statement to console
app.listen(3000, () => console.log('Running on port 3000'))

