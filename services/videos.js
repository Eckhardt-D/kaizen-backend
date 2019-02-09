const fetch = require('node-fetch');
const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet%2C+id&publishedAfter=2018-07-17T08:42:24.000Z&channelId=UCd4UmlBFIhj-yJrzn6foxgw&maxResults=50&order=date&key=${process.env.YT_API}`;
const videoController = require('./database');
let videos = []

setTimeout(() => {
  fetch(URL)
  .then(res => res.json())
  .then(data => { 
    pingApi(data)
    .then(r => r)
    .catch(e => e)
  })
  .catch(err => console.log('err', '=>', err));
}, (1000*60*60*24))


module.exports = () => {
  return new Promise((resolve, reject) => {
    videoController.getVideos()
    .then(data => {
      resolve(data)
    })
    .catch(() => reject(videos));
  })
}