import product from '../models/products.js';
import video from '../models/videos.js';
import comment from '../models/comments.js';
import user from '../models/users.js';
import isEmpty from '../helpers/isEmpty.js';
import checkType from '../helpers/checkType.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!checkType(email, 'string') || !checkType(password, 'string')) {
    return res.status(400).json({
      message: 'Invalid datatype!',
    });
  }

  // check if any value in the body is empty
  if (isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({
      error: 'Request body can not be empty!',
    });
  }

  try {
    // check if the user is already registered
    const data = await user.findOne({
      email: email,
    });

    if (!data) {
      return res.status(400).json({
        message: 'Invalid email!',
      });
    }

    const validate = await bcrypt.compare(password, data.password);

    if (!validate) {
      return res.status(400).json({
        message: 'Invalid password!',
      });
    }

    const token = jwt.sign(
      { user_id: data._id, email: data.email, username: data.username },
      process.env.SECRET_KEY,
      {
        expiresIn: '15m',
      }
    );

    res.status(200).json({
      success: true,
      // return jwt
      token,
    });
  } catch (error) {
    // Handle errors, e.g., log the error or send an error response
    res.status(500).json({
      message: 'An error occurred during login.',
    });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !checkType(username, 'string') ||
    !checkType(email, 'string') ||
    !checkType(password, 'string')
  ) {
    return res.status(400).json({
      message: 'Invalid datatype!',
    });
  }

  // check if any value in the body is empty
  if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({
      error: 'Request body can not be empty!',
    });
  }

  try {
    // check if the user is already registered
    let userExist = await user.findOne({ email: email });

    if (userExist)
      return res.status(409).json({
        message: 'This email is already registered!',
      });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username: username,
      email: email,
      password: encryptedPassword,
    };

    await user.insertMany(newUser);

    res.status(201).json({
      message: 'Register Success!',
    });
  } catch (error) {
    console.log('Something went wrong! ', error);
  }
};

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
