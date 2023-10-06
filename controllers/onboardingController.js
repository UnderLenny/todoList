const User = require("../models/userModel");

exports.getViews = async (req, res) => {
  try {
    res.render("./onboarding");
  } catch (err) {
    console.log(err);
  }
};

exports.getMail = async (req, res) => {
  try {
    const user = new User({
      email: req.body.emailValue,
    });
    await user.save();
  } catch (err) {
    console.log(err);
  }
};
