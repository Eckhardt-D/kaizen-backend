const mail = require('nodemailer');

function send(data, cb) {
  const message = data;

  let mailOpts = {
    from: `"Client 👻" <${message.email}>`, // sender address
    to: 'support@kaizenmedia.co.za', // list of receivers
    subject: 'Website Enquiry ✔', // Subject line
    text: 
    `name: ${message.name}\nemail: ${message.email}\ntype: ${message.type}\nmessage: ${message.message}\n T's and C's: ${message.accepted}` // plain text body
  }

  const SMTP = {
    host: 'smtp.kaizenmedia.co.za',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: 'support@kaizenmedia.co.za',
        pass: '123Interesting'
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