import mongoose from 'mongoose';

const videosSchema = new mongoose.Schema({
  imageUrl: String,
});

const video = mongoose.model('Video', videosSchema);

export default video;
