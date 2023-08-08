import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema(
  {
    _videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: mongoose.Types.ObjectId,
    },
    isAnon: {
      type: Boolean,
      required: true,
    },
    username: String,
    comment: String,
  },
  {
    timestamps: true,
  }
);

// Provide a function to generate the default ObjectId
commentsSchema.path('_userId').default(() => new mongoose.Types.ObjectId());

const comment = mongoose.model('Comment', commentsSchema);

export default comment;
