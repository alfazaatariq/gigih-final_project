import VideosList from '../components/videoslist/VideosList';
import Header from '../components/header/Header';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Video from '../../interfaces/video';
import config from '../../config/config';

export const VideoContext = createContext<Video[]>([]);

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get(`${config.baseURL}:${config.port}/videos`);
    setVideos(res.data.videos);
  };

  return (
    <>
      <VideoContext.Provider value={videos}>
        <Header />
        {/* search */}
        <div className='flex mt-4 space-x-2 mx-2'>
          <input
            className='w-full outline-none rounded-md px-2 md:block md:grow'
            type='text'
            name='search'
            placeholder='Search videos you are looking for'
            id='search'
          />
        </div>
        <VideosList />
      </VideoContext.Provider>
    </>
  );
};

export default HomePage;
