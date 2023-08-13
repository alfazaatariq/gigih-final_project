import video from '../models/videos.js';

const findVideoId = async (url) => {
  const result = await video.findOne({
    imageUrl: url,
  });
  return result._id;
};

export default findVideoId;
