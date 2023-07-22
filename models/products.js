import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  _videoId: String,
  name: String,
  link: String,
  price: Number,
});

const product = mongoose.model('Product', productsSchema);

export default product;
