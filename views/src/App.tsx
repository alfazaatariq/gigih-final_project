import './App.css';
import PageLayout from './layouts/PageLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Video {
  _id: string;
  imageUrl: string;
}

function App() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await axios.get('http://localhost:3000/videos');
    setVideos(res.data.videos);
  };

  return (
    <>
      <PageLayout>
        <ul className='flex flex-wrap mt-5'>
          {videos.map((video) => {
            return (
              <li
                key={video._id}
                className='w-1/2 h-60 md:w-1/3 lg:w-1/5 cursor-pointer hover:bg-slate-400 rounded-lg transition duration-300 ease-in-out'
              >
                <img
                  className='w-full min-h-full p-1 object-cover rounded-lg'
                  src={video.imageUrl}
                  alt='thumbnail'
                />
              </li>
            );
          })}
        </ul>
      </PageLayout>
    </>
  );
}

export default App;
