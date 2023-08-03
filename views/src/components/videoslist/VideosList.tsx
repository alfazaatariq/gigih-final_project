import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Video from '../../../interfaces/video';
import config from '../../../config/config';

const VideosList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const onClickHandler = (videoID: string) => {
    navigate(`/video/${videoID}`);
  };

  const fetchVideos = async () => {
    const res = await axios.get(`${config.baseURL}:${config.port}/videos`);
    setVideos(res.data.videos);
  };

  return (
    <ul className='flex flex-wrap mt-5'>
      {videos.map((video) => {
        return (
          <li
            onClick={() => onClickHandler(video._id)}
            key={video._id}
            className='w-1/2 p-2 h-60 md:w-1/3 lg:w-1/5 cursor-pointer hover:bg-slate-400 rounded-lg transition duration-300 ease-in-out'
          >
            <img
              className='w-full min-h-full object-cover rounded-lg'
              src={video.imageUrl}
              alt='thumbnail'
            />
          </li>
        );
      })}
    </ul>
  );
};

export default VideosList;
