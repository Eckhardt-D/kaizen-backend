const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// const morgan = require('morgan');
const mw = require('./middleware');
const sendMail = require('./mailer');
// const seedData = require('./seed.json');
const getVideos = require('./services/videos');

const corsOptions = {
  origin: [process.env.ORIGIN_PROD, process.env.ORIGIN_PROD_TWO],
}

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

app.get('/v1/videos', (_, res) => {
  getVideos().then(videos => res.json(videos))
    .catch(e => res.json(e));
});

app.post('/v1/mail', [mw.checkHeaders, mw.checkSchema], (req, res) => {
  const details = req.body;

  sendMail(details, result => {
    if(result.err) return res.status(500).send(result.err);
    return res.status(200).send('OK');
  });
});

let port = process.env.PORT || 1101;
app.listen(port, () => console.log('SERVER RUNNING'));
