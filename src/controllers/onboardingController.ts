import { Request, Response } from "express";
import User from "./../models/userModel";
import sendEmail from "./../utils/email";

export const getViews = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render("onboarding");
  } catch (err) {
    console.log(err);
  }
};

export const getMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User({
      email: req.body.emailValue,
    });

    await user.save();

    // res.status(201).json({ message: "Вы успешно подписались на рассылку!" });
    setInterval(() => {
      sendEmail(
        user.email,
        "Не забывай ставить задачи перед собой!",
        "Привет, продуктивный человек! Новая неделя — новые возможности! 🚀 Чтобы сделать ее максимально эффективной, предлагаю воспользоваться нашим менеджером задач. 📝"
      );
    }, 14400000);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
