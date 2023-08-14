import VideosList from '../components/videoslist/VideosList';
import Header from '../components/header/Header';
import { useState, useEffect, createContext } from 'react';
import axios, { CancelToken } from 'axios';
import Video from '../../interfaces/video';
import useDebounce from '../../hooks/useDebounce';
import useInput from '../../hooks/useInput';

export const VideoContext = createContext<Video[]>([]);

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const searchInput = useInput();
  const debouncedValue = useDebounce(searchInput.value, 750);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchVideos = async (cancelToken: CancelToken) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/videos?videoName=${debouncedValue}`,
          {
            cancelToken: cancelToken,
          }
        );
        setVideos(res.data.videos);
        setNotFound(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setNotFound((prevNotFound) => !prevNotFound);
          }
        } else {
          console.error('Unknown error occurred:', error);
        }
      }
    };

    fetchVideos(cancelToken.token);

    return () => {
      cancelToken.cancel();
    };
  }, [debouncedValue]);

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
            {...searchInput}
          />
        </div>
        {notFound ? (
          <div className='flex justify-center items-center text-white pt-64'>
            <h1>Video not found</h1>
          </div>
        ) : (
          <VideosList />
        )}
      </VideoContext.Provider>
    </>
  );
};

export default HomePage;
