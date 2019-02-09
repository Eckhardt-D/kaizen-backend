const mail = require('nodemailer');

function send(data, cb) {
  const message = data;
  
  if(message.accepted.length < 1) {
    message.accepted = 'Not Accepted'
  } else {
    message.accepted = 'Accepted'
  }

  let mailOpts = {
    from: `"Client 👻" <${message.email}>`, // sender address
    to: process.env.MAIL_USER, // list of receivers
    subject: 'Website Enquiry ✔', // Subject line
    text: 
    `name: ${message.name}\nemail: ${message.email}\ntype: ${message.type}\nmessage: ${message.message}\n T's and C's: ${message.accepted}` // plain text body
  }

  const SMTP = {
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // use TLS
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  }

  let transporter = mail.createTransport(SMTP);
  transporter.sendMail(mailOpts, err => err ? cb({err}) : cb(true));
}

module.exports = send;