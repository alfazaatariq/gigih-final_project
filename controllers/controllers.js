import product from '../models/products.js';
import video from '../models/videos.js';

export const getAllVideos = async (req, res) => {
  let data = await video.find();
  if (data.length > 0) {
    return res.status(200).json({
      videos: data,
    });
  }

  res.status(404).json({
    message: 'Its Empty!',
  });
};

export const getProductsById = async (req, res) => {
  let { _videoId } = req.body;

  try {
    let data = await product.find({
      _videoId: _videoId,
    });

    if (data.length > 0) {
      // Create a new array of products without the _videoId key
      const products = data.map((product) => {
        const { _videoId, ...productWithoutVideoId } = product.toObject();
        return productWithoutVideoId;
      });

      return res.status(200).json({
        products: products,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};
