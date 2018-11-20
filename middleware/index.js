const crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = 'monkeybloodbitch';

function decrypt(text){
  try {
    const decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return { result: dec };
  } catch(err) {
    return { error: 'INVALID_ENCRYPTED_TEXT' };
  }
}

const mws = {
  checkHeaders: function(req, res, next) {
    if(!req.headers['x-is-ksecure']) return res.status(401).send("UNAUTHORIZED");

    if(decrypt(req.headers['x-is-ksecure'].toString()).error) {
      res.status(401).send("UNAUTHORIZED");
    } else {
      next();
    }
  },
  checkSchema: function(req, res, next) {
    const schema = req.body;
    const keys = Object.keys(schema);

    if(keys.length !== 4) {
      res.status(401).send("UNAUTHORIZED")
    } else {
      keys.forEach(key => { 
        if(typeof schema[key] !== 'string') {
          res.status(401).send("UNAUTHORIZED") 
        } else { 
          schema[key] = schema[key].toString();
        }
      });
      next();
    }
  }
}

module.exports = mws;