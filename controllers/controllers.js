import product from '../models/products.js';
import video from '../models/videos.js';
import comment from '../models/comments.js';
import isEmpty from '../helpers/isEmpty.js';
import checkType from '../helpers/checkType.js';

export const getVideoById = async (req, res) => {
  let { _videoId } = req.params;

  if (!checkType(_videoId, 'string')) {
    return res.status(400).json({
      message: 'Invalid data type!',
    });
  }

  if (isEmpty(_videoId)) {
    return res.status(400).json({
      message: 'Request body cannot be empty!',
    });
  }

  try {
    const response = await video.findById(_videoId);
    if (response) {
      return res.status(200).json({
        message: 'video found!',
        video: response,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: 'Video not found!',
    });
  }
};

export const getAllVideos = async (req, res) => {
  let count = await video.count();

  if (count > 0) {
    try {
      let data = await video.find();

      if (data.length > 0) {
        return res.status(200).json({
          videos: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  res.status(404).json({
    message: 'Its Empty!',
  });
};

export const getProductsById = async (req, res) => {
  let { _videoId } = req.params;

  if (!checkType(_videoId, 'string')) {
    return res.status(400).json({
      message: 'Invalid data type!',
    });
  }

  if (isEmpty(_videoId)) {
    return res.status(400).json({
      message: 'Request body can not be empty!',
    });
  }

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

export const getCommentsById = async (req, res) => {
  let { _videoId } = req.body;

  if (!checkType(_videoId, 'string')) {
    return res.status(400).json({
      message: 'Invalid data type!',
    });
  }

  if (isEmpty(_videoId)) {
    return res.status(400).json({
      message: 'Request body can not be empty!',
    });
  }

  try {
    let data = await comment.find({
      _videoId: _videoId,
    });

    if (data.length > 0) {
      // Create a new array of products without the _videoId key
      const comments = data.map((comment) => {
        const { _id, _videoId, __v, ...commentFiltered } = comment.toObject();
        return commentFiltered;
      });

      return res.status(200).json({
        comments: comments,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Comments not found!',
    });
  }
};

export const submitComment = async (req, res) => {
  const { _videoId, username, comment: userComment } = req.body;

  if (
    !checkType(username, 'string') ||
    !checkType(userComment, 'string') ||
    !checkType(_videoId, 'string')
  ) {
    return res.status(400).json({
      message: 'Invalid datatype!',
    });
  }

  // check if any value in the body is empty
  if (isEmpty(username) || isEmpty(userComment) || isEmpty(_videoId)) {
    return res.status(400).json({
      error: 'Request body can not be empty!',
    });
  }

  try {
    // check if video existed
    let videoExist = await video.findOne({ _id: _videoId });

    if (videoExist) {
      let payload = {
        _videoId: _videoId.trim(),
        username: username.trim(),
        comment: userComment.trim(),
      };

      try {
        await comment.insertMany(payload);
        return res.status(201).json({
          message: 'Comment added successfully!',
        });
      } catch (error) {
        res.status(400).json({
          message: 'Comment can not be added!',
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      message: 'Video not found!',
    });
  }
};
