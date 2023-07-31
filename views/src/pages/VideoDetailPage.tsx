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
      console.error('Error fetching video details:', error);
    }
  };

  return (
    <>
      <PageLayout>
        <h1>VIDEO DETAIL PAGE</h1>
        {/* Display the video details */}
        <div>
          <h2>Video ID: {videoDetail._id}</h2>
          <img src={videoDetail.imageUrl} alt='Video Thumbnail' />
          {/* Any other video details you want to display */}
        </div>
      </PageLayout>
    </>
  );
};

export default VideoDetailPage;
