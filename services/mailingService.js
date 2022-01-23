const nodemailer=require("nodemailer");

let transporter=nodemailer.createTransport({
    service:process.env.MAIL_HOST,
    auth:   {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD

    }
});

module.exports = {
    async sendOptInMail(email, userID, token) {
      let activationLink = `${process.env.BASE_URL}api/verify/${userID}/${token}`;
      let mail = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Please active your account",
        text: `To activate your account, please click this link: ${activationLink}`,
        html: `<p>To activate your account, please click this link: <a href="${activationLink}">${activationLink}</a></p>`,
      };
      await transporter.sendMail(mail);
    },
  };