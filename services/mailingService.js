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
      let activationLink = `${process.env.BASE_URL}verify/${userID}/${token}`;
      let mail = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Bitte aktivieren sie ihren Account",
        text: `Sie können ihren Account mit folgendem Link aktivieren: ${activationLink}`,
      };
      await transporter.sendMail(mail);
    },
  };