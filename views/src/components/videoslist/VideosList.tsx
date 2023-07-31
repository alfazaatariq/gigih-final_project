import { useState, useEffect } from 'react';
import axios from 'axios';

interface Video {
  _id: string;
  imageUrl: string;
}

const VideosList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get('http://localhost:3000/videos');
    setVideos(res.data.videos);
  };

  return (
    <ul className='flex flex-wrap mt-5'>
      {videos.map((video) => {
        return (
          <li
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
