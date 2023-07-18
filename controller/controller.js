const nodemailer = require("nodemailer");
const { email, pass } = require("./env");
const mailgen = require("mailgen");

const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  let msg = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "hannaankazi@gmail.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "tq for signing up", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  transporter
    .sendMail(msg)
    .then((info) => {
      return res.status(201).json({
        msg: "mail sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
  //   res.status(201).json("signup successfyl");
};
const bill = (req, res) => {
  const {receiver} = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  };
  let transporter = nodemailer.createTransport(config);
  let mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: "Amazon",
      link: "https://amazon.in",
    },
  });
  let response = {
    body: {
      name: "hannaan",
      intro: "test bill",
      table: {
        data: [
          {item: "Haunting adeline",
          description: "Dark shitty novel",
          author:"H.D. Carlton",
          price: "150",}
        ],
      },
      outro: "looking fwd to more testing",
    },
  };
  let mail = mailgenerator.generate(response);
  let message = {
    from: email,
    to: receiver,
    subject: "Order Placed",
    html: mail,
    // attachments:[{
    //   filename:'light pollution.docx',
    //   path:'../../light pollution.docx'
    // }]
  };
  transporter
    .sendMail(message)
    .then((info) => {
      console.log(info.messageId);
      return res.status(201).send("mail sent");
    })
    .catch((err) => {
      return res.status(500).json({ msg:err.message });
    });
  //   res.status(201).json("bill");
};
module.exports = {
  signup,
  bill,
};
