import VideosList from '../components/videoslist/VideosList';
import Header from '../components/header/Header';
import { useState, useEffect, createContext } from 'react';
import axios, { CancelToken } from 'axios';
import Video from '../../interfaces/video';
import config from '../../config/config';
import useDebounce from '../../hooks/useDebounce';

export const VideoContext = createContext<Video[]>([]);

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 1000);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    fetchVideos(cancelToken.token);

    return () => {
      cancelToken.cancel();
    };
  }, [debouncedValue]);

  const fetchVideos = async (cancelToken: CancelToken) => {
    const res = await axios.get(`${config.baseURL}:${config.port}/videos`, {
      cancelToken: cancelToken,
    });
    setVideos(res.data.videos);
  };

  const onSearchVideosHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
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
            onChange={onSearchVideosHandler}
          />
        </div>
        <VideosList />
      </VideoContext.Provider>
    </>
  );
};

export default HomePage;
