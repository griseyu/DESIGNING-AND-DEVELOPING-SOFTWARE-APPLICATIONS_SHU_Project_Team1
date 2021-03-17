const mongoose = require("mongoose");

const AdminModel = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    // email: {type: email, required: true, unique: true},
    password: { type: String, required: true },
  },
  { collection: "admin" }
);

const model123 = mongoose.model("AdminModel", AdminModel);

module.exports = model123;
