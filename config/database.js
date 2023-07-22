import mongoose from 'mongoose';
import video from '../models/videos.js';
import populateVideos from '../helpers/populateVideos.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected!');

    let videos = await video.find();

    if (videos.length === 0) {
      await populateVideos();
      console.log('Videos Populated!');
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
