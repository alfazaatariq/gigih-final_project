import product from '../models/products.js';
import video from '../models/videos.js';
import comment from '../models/comments.js';
import user from '../models/users.js';
import isEmpty from '../helpers/isEmpty.js';
import checkType from '../helpers/checkType.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUserById = async (req, res) => {
  const { _id } = req.params;

  if (!checkType(_id, 'string')) {
    return res.status(400).json({
      message: 'Invalid datatype!',
    });
  }

  // check if any value in the body is empty
  if (isEmpty(_id)) {
    return res.status(400).json({
      error: 'Request params can not be empty!',
    });
  }

  try {
    const response = await user.findById(_id);
    return res.status(200).json({
      user: response,
    });
  } catch (error) {
    res.status(404).json({ message: 'User not found!' });
  }
};

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
        expiresIn: '60m',
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

    const url = req.protocol + '://' + req.get('host');

    const newUser = {
      profilePicture: `${url}/files/default.jpg`,
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
      message: 'Request params cannot be empty!',
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
  const { videoName } = req.query;

  try {
    let query = video.find();

    if (videoName) {
      const videoNameRegex = new RegExp(videoName, 'i');
      query = query.where('videoName').regex(videoNameRegex);
    }

    const videos = await query.exec();

    if (videos.length > 0) {
      return res.status(200).json({
        videos: videos,
      });
    }

    res.status(404).json({
      message: 'No matching videos found!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
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
      message: 'Request params can not be empty!',
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
      message: 'Request params can not be empty!',
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

    return res.status(404).json({
      message: 'Comments not found!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

export const submitComment = async (req, res) => {
  const {
    _userId,
    isAnon,
    username,
    comment: userComment,
    profilePicture,
  } = req.body;
  const { _videoId } = req.params;

  if (
    !checkType(username, 'string') ||
    !checkType(userComment, 'string') ||
    !checkType(_videoId, 'string') ||
    !checkType(profilePicture, 'string') ||
    !checkType(isAnon, 'boolean')
  ) {
    return res.status(400).json({
      message: 'Invalid datatype!',
    });
  }

  if (isEmpty(_videoId)) {
    return res.status(400).json({
      error: 'Request params can not be empty!',
    });
  }

  if (isEmpty(username) || isEmpty(userComment) || isEmpty(profilePicture)) {
    return res.status(400).json({
      error: 'Request body can not be empty!',
    });
  }

  try {
    const videoExist = await video.findOne({ _id: _videoId });

    if (!videoExist) {
      return res.status(404).json({
        message: 'Video not found!',
      });
    }

    const url = req.protocol + '://' + req.get('host');

    let payload = {
      _videoId: _videoId.trim(),
      username: username.trim(),
      comment: userComment.trim(),
      profilePicture: `${url}/files/${profilePicture.trim()}`,
      isAnon: isAnon, // Set the isAnon field in the payload
    };

    if (!isAnon) {
      const userExist = await user.findOne({ _id: _userId, username });

      if (!userExist) {
        return res.status(404).json({
          message: 'User not found!',
        });
      }

      payload._userId = _userId.trim();
      payload.profilePicture = profilePicture.trim();
    }

    await comment.insertMany(payload);

    return res.status(201).json({
      message: 'Comment added successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
};

export const updateProfilePicture = async (req, res) => {
  const { _id } = req.params;
  const url = req.protocol + '://' + req.get('host');

  if (!checkType(_id, 'string')) {
    return res.status(400).json({
      message: 'Invalid data type!',
    });
  }

  if (isEmpty(_id)) {
    return res.status(400).json({
      message: 'Request params can not be empty!',
    });
  }

  try {
    let payload = {
      profilePicture: url + req.file.filename,
    };

    await user.findByIdAndUpdate(_id, payload);
    await comment.updateMany({ _userId: _id }, payload);

    res.status(200).json({ message: 'Profile picture updated!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getAllUsers = async (req, res) => {
  let count = await user.count();

  if (count > 0) {
    try {
      let data = await user.find();

      if (data.length > 0) {
        return res.status(200).json({
          users: data,
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
