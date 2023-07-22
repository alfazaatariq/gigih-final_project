import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema(
  {
    _videoId: String,
    username: String,
    comment: String,
  },
  {
    timestamp: true,
  }
);

const comment = mongoose.model('Comment', commentsSchema);

export default comment;
