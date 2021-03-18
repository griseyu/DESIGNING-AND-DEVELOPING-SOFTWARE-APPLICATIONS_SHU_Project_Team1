// include express and create new express object to interact with the express library
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const hairCareQueries = require("./models/hairCareQueries");
const makeUpQueries = require("./models/makeUpQueries");
const skinCareQueries = require("./models/skinCareQueries");
//Contact Us Form
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// server and routes for singup/login/product dbs
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user2");
const User2 = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const zxh = "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
const cors = require("cors");
// const authRoutes = require("auth-routes");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/ddsa-project";

//connect through mongoose
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Routes start

//Setting templating engine
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

// create a route for get requests for the route of our website
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/makeUp", function (req, res) {
  res.render("makeUp");
});

app.get("/hairCare", function (req, res) {
  res.render("hairCare");
});

app.get("/skinCare", function (req, res) {
  res.render("skinCare");
});

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.get("/admin", function (req, res) {
  //   function checkCookie() {
  //     var user = getCookie("username");
  //     if (user === "admin" && password === "@Leeds21") {
  //       res.render("admin");
  //     } else {
  //       res.render("login");
  //     }
  //   }
  // });
  res.render("admin");
});

app.get("/hairCareResults", function (req, res) {
  res.render("hairCareResults");
});

app.get("/skinCareResults", function (req, res) {
  res.render("skinCareResults");
});

app.get("/makeUpResults", function (req, res) {
  res.render("makeUpResults");
});

app.get("/AboutUs", function (req, res) {
  res.render("AboutUs");
});

// add the router
app.use("/", router);

// Opens new page to display the table with the suggested products on
// Sends to an API
app.get("/hairCareResultsAPI", async function (req, res) {
  // Check if req.query.hairIngredients is an array
  const hairArray = Array.isArray(req.query.hairIngredients)
    ? // writes the contents of req.query.hairIngredients to an array to be used in the MongodB query
      req.query.hairIngredients
    : [req.query.hairIngredients];

  // testing line to ensure array is populated -- to be removed
  console.log(hairArray);

  var query = { Content: { $all: hairArray } };
  const hairResults = await hairCareQueries.hairCareQueries.find(query, {
    _id: 0,
    product: 1,
    link: 1,
  });
  res.json(hairResults);
});

app.get("/skinCareResultsAPI", async function (req, res) {
  const skinArray = Array.isArray(req.query.skinIngredients)
    ? req.query.skinIngredients
    : [req.query.skinIngredients];

  console.log(skinArray);
  var query = { Content: { $all: skinArray } };
  const skinResults = await skinCareQueries.skinCareQueries.find(query, {
    _id: 0,
    product: 1,
    link: 1,
  });
  res.json(skinResults);
});

app.get("/makeUpResultsAPI", async function (req, res) {
  const makeUpArray = Array.isArray(req.query.makeUpIngredients)
    ? req.query.makeUpIngredients
    : [req.query.makeUpIngredients];

  console.log(makeUpArray);
  var query = { Content: { $all: makeUpArray } };
  const makeUpResults = await makeUpQueries.makeUpQueries.find(query, {
    _id: 0,
    product: 1,
    link: 1,
  });
  res.json(makeUpResults);
});

// Authorization

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Route to login page
app.get("/login", function (req, res) {
  res.render("login", { root: __dirname });
});

//handling login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  } // if no username in the db - error message

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      zxh
    );

    res.cookie("token", token, {
      maxAge: 1 * 24 * 3600 * 1000,
      httpOnly: true,
    });

    res.cookie("username", username, {
      maxAge: 1 * 24 * 3600 * 1000,
    });

    const validateToken = (req, res, next) => {
      const token = req.cookies["token"];

      if (!token)
        return res.status(400).json({ error: "User not Authenticated!" });

      try {
        const validToken = verify(token, "zxh");
        if (validToken) {
          req.authenticated = true;
          return next();
        }
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    };

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

//Secret page to login
app.post("/topsecret", (req, res) => {
  jwt.verify(req.body.token, zxh, function (err, decoded) {
    if (err) {
      res.json({ status: "fail" });
    } else {
      res.json({ status: "success", username: decoded.username });
    }
  });
});

//Route to register page
app.get("/register", function (req, res) {
  res.render("registrationForm", { root: __dirname });
});

//post data to db for registration and password handling
app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  } //only accepts string for username

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 7) {
    return res.json({
      status: "error",
      error: "Password is too short! 8+ characters pls",
    });
  } //some security measures for the passwords

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

//logout
app.get("/logout", (req, res) => {
  res.cookie("token", {
    maxAge: 0,
  });

  res.cookie("username", {
    maxAge: 0,
  });

  res.clearCookie("token");
  res.clearCookie("username");

  res.render("login", { root: __dirname });
});

//changing password
app.get("/change-password", function (req, res) {
  res.render("change-password", { root: __dirname });
});

app.post("/api/change-password", async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 7) {
    return res.json({
      status: "error",
      error: "Password is too short! 8+ characters pls",
    });
  }

  try {
    const user = jwt.verify(token, zxh);

    const _id = user.id;

    const password = await bcrypt.hash(plainTextPassword, 10);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: ";))" });
  }
});

// listen on port 3000 and return statement to console
app.listen(3000, () => console.log("Running on port 3000"));

//contact us form

const PORT = process.env.PORT || 3000;

//let EMAIL = "c0049747@my.shu.ac.uk"
// instantiate an express app
// cors
app.use(cors({ origin: "*" }));

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// verify connection configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

app.post("/ContactUsTutorial/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    //console.log("fields",fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log("data", data);
    const mail = {
      sender: `${data.name} <${data.email}>`,
      to: "almostlorelai@gmail.com", // receiver email,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //console.log("sendmail",mail);
    // transporter.sendMail(mail, (err, data) => {

    // });
  });
  if (true) {
    return res.status(200).send("Email successfully sent to recipient!");
  } else {
    return res.status(500).send("Something went wrong.");
  }
});

//Index page (static HTML)
app.get("/ContactUsTutorial", function (req, res) {
  res.render("ContactUsTutorial");
});

app.get("/ContactUsTutorialSubmit", function (req, res) {
  res.render("ContactUsTutorialSubmit");
});

app.get("/ContactUsTutorialError", function (req, res) {
  res.render("ContactUsTutorialError");
});
/*************************************************/
