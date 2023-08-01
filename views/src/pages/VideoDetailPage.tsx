import extractVideoID from '../../helpers/extractVideoID';
import { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface VideoDetail {
  _id: string;
  imageUrl: string;
  __v: number;
}

const VideoDetailPage = () => {
  const [videoDetail, setVideoDetail] = useState<VideoDetail>({
    _id: '',
    imageUrl: '',
    __v: 0,
  });
  const location = useLocation();
  const youtubeID = extractVideoID(videoDetail.imageUrl);
  const videoID = location.pathname.split('/video/')[1];

  useEffect(() => {
    // Call the fetchVideoByID function when the component mounts
    fetchVideoByID(videoID);
  }, [videoID]);

  const fetchVideoByID = async (videoID: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/videos/${videoID}`);
      setVideoDetail(res.data.video);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  return (
    <>
      <PageLayout>
        {/* Display the video details */}
        <div className='absolute w-full top-0'>
          <iframe
            className='w-full h-64'
            src={`https://www.youtube.com/embed/${youtubeID}`}
            title='YouTube video player'
            allow='autoplay;'
          ></iframe>

          <h2 className='text-white'>Product List</h2>
        </div>
      </PageLayout>
    </>
  );
};

export default VideoDetailPage;
