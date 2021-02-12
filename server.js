// include express and create new express object to interact with the express library

const express = require('express');
const app = express();
const path =require('path');
const router = express.Router();
const hairCareQueries = require('./hairCareQueries')
const makeUpQueries = require('./makeUpQueries')
const skinCareQueries = require('./skinCareQueries')
// var exphbs = require('express-handlebars');

// tells express where our static files are stored
// app.use(express.static(path.join(__dirname, '/CSS')));
// app.use('/Images', express.static('/public'));

app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, '/public/Images')));


// app.get('/css/styles.css', function(req, res){ 
//     res.send('css/styles.css'); res.end(); });

// app.use("/", express.static("../CSS"));

// sets the view engine to use handlebars
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// create a route for get requests for the route of our website
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/home.html'));
})
// app.get('/', (req, res) => res.send('Hello World'))

app.get('/makeUp', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/makeUp.html'));
})

app.get('/hairCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/hairCare.html'));
})

app.get('/skinCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/HTML/skinCare.html'));
})

// add the router
app.use('/', router);





// server and routes for singup/login/product dbs 
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./user2')
// const hairCareModel = require('./hairCareQueries')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ddsa-project";


// import {printChecked} from './survey.js';
// let ingredientSelection = printChecked();


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

app.get('/login', function(req, res){
	res.sendFile('/public/HTML/login.html', {root: __dirname })
})

app.get('/register', function(req, res){
	res.sendFile('/public/HTML/registrationForm.html', {root: __dirname })
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

// mongodb query WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING WORKING
app.set('view engine', 'ejs');

app.post('/makeUp', (req,res,value) => {
	// res.send('Hi')
	// hairQueries.hairQuery
	// console.log("coming from app.post")
		console.log(req.body)
		var query = {Content: {$all: req.body.muIngredients}}
		makeUpQueries.makeUpQueries.find(query, {_id: 0, product: 1, link: 1}, function (err, makeUpProducts) {
		if (err) return handleError(err)
		let productName = []
		makeUpProducts.forEach(x => productName.push(x.product))
		res.send(productName)
		// console.log(makeUpProducts[0].product)
		// console.log('makeup')
		// res.send(makeUpProducts[0].product)
	})
})

app.post('/hairCare', (req,res,value) => {
	// res.send('Hi')
	// hairQueries.hairQuery
	// console.log("coming from app.post")
		console.log(req.body)
		var query = {ingredients: { $all: req.body.hairIngredients}}
		hairCareQueries.hairCareQueries.find(query, {_id: 0, product: 1, link: 1}, function (err, hairCareProducts) {
		if (err) return handleError(err)
		hairCareProducts.forEach(x => console.log(x.product))
		// console.log(hairCareProducts[0].product)
		console.log('hairCare')
	})
})

// EXPERIMENTING USING QUERYING BY ARRAY
// app.post('/makeUp', (req,res,value) => {
// 	// res.send('Hi')
// 	// hairQueries.hairQuery
// 	// console.log("coming from app.post")
// 		console.log(req.body)
// 		var reqBody = [req.body.muIngredients]
// 		hairQueries.hairQueries.find({'ingredients':'reqBody'}, function (err, hairCareProducts) {
// 		if (err) return handleError(err)
// 		console.log(hairCareProducts)
// 		console.log('haircare')
// 	})
// })




// app.post('/makeUp', (req,res,value) => {
// 	res.send('Hi')
// 	MongoClient.connect(url, async function (err, client) {
//      if(err) throw err;
// 	console.log('here now')
// 	const db = client.db("ddsa-project");
// 	 try {
// 		//db query calls
// 		const productResult = await db.collection('hairCareProducts').find({ingredients: "Argania Spinosa Kernel Oil."})
// 		// let cursor = productResult;

// 		// cursor.forEach(item => {
// 		 	console.log(productResult)
// 		// })
		
//     }catch (err) {
//         console.log(err)
//     }
// });
// })

// listen on port 3000 and return statement to console
app.listen(3000, () => console.log('Running on port 3000'))

