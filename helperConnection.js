const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ddsa_project', {useNewUrlParser: true });

mongoose.connection
 .once("open", () => console.log("connected"))
 .on("error", error => {
     console.log("Your Error", error);
 })