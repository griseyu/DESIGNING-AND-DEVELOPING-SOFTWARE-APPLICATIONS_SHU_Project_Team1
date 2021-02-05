const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/loginform', (req, res) => {
  res.sendFile(__dirname + '/loginform.html');
  //   res.sendFile(path.join(__dirname + "/loginform.html"));
  //   res.sendFile("loginform.html", { root: path.join(__dirname, "public") });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
