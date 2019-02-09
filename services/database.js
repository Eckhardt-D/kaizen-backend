const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI
mongoose.connect(DB_URL, { useNewUrlParser: true });

const Video = mongoose.model('Video', {
  id: String,
  date: String,
  title: String,
  description: String,
  videoImage: String
});

module.exports = {
  pingApi: async payload => {
    try {
      for(let i = 0; i < payload.items.length - 1; i++) {
        let video = payload.items[i];
        const query = {
          id: video.id.videoId,
          date: video.snippet.publishedAt,
          title: video.snippet.title,
          description: video.snippet.description,
          videoImage: video.snippet.thumbnails.medium.url
        }
        await Video.findOneAndUpdate({id: query.id}, query, { upsert: true });
      }
      return 'complete';
    } catch (err) {
      return err
    }
  },
  getVideos: async () => {
    return Video.find((err, videos) => err? [] : videos);
  }
}