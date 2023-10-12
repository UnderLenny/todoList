import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "TaskManager <kk.lenny@mail.ru>",
      to,
      subject,
      text: message,
    };
    console.log("Рассылка успешно отправлена!");
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Ошибка при отправке рассылки:", err);
  }
};

export default sendEmail;
