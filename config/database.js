import mongoose from 'mongoose';
import video from '../models/videos.js';
import product from '../models/products.js';
import populateVideos from '../helpers/populateVideos.js';
import populateProducts from '../helpers/populateProducts.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected!');

    let videos = await video.find();
    let products = await product.find();
    // let products = await product.deleteMany({});
    // let videos = await video.deleteMany({});

    if (videos.length === 0) {
      await populateVideos();
      console.log('Videos Populated!');
    }

    if (products.length === 0) {
      await populateProducts();
      console.log('Products Populated!');
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
