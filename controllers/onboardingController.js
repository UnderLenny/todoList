const User = require("../models/userModel");
const sendEmail = require("../utils/email");

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

    // res.status(201).json({ message: "Вы успешно подписались на рассылку!" });
    setInterval(() => {
      sendEmail({
        email: user.email,
        subject: "Не забывай ставить задачи перед собой!",
        message:
          "Привет, продуктивный человек! Новая неделя — новые возможности! 🚀 Чтобы сделать ее максимально эффективной, предлагаю воспользоваться нашим менеджером задач. 📝",
      });
    }, 14400000);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
