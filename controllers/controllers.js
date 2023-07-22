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
