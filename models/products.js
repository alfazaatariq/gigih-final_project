import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  _videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  name: String,
  link: String,
  price: Number,
});

const product = mongoose.model('Product', productsSchema);

export default product;
