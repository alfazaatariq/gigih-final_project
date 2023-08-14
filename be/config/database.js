import mongoose from 'mongoose';
import video from '../models/videos.js';
import product from '../models/products.js';
import comment from '../models/comments.js';
import user from '../models/users.js';
import populateVideos from '../helpers/populateVideos.js';
import populateProducts from '../helpers/populateProducts.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected!');

    let videos = await video.count();
    let products = await product.count();

    // let products = await product.deleteMany({});
    // let videos = await video.deleteMany({});
    // let comments = await comment.deleteMany({});
    // let users = await user.deleteMany({});

    if (videos === 0) {
      await populateVideos();
      console.log('Videos Populated!');
    }

    if (products === 0) {
      await populateProducts();
      console.log('Products Populated!');
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
