import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema(
  {
    _videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    username: String,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const comment = mongoose.model('Comment', commentsSchema);

export default comment;
