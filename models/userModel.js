const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
