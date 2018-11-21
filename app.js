const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mw = require('./middleware');
const sendMail = require('./mailer');

const corsOptions = {
  origin: ['https://kaizenmedia.co.za', 'http://localhost:3000'],
}

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(mw.checkHeaders);
app.use(mw.checkSchema);

app.post('/v1/mail', (req, res) => {
  const details = req.body;

  sendMail(details, result => {
    if(result.err) return res.status(500).send(result.err);
    return res.status(200).send('OK');
  });
});

let port = process.env.port || 1101;
app.listen(port, () => console.log('SERVER RUNNING'));
