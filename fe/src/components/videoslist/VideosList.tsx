import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { VideoContext } from '../../pages/HomePage';

const VideosList = () => {
  const Video = useContext(VideoContext);
  const navigate = useNavigate();

  const onClickHandler = (videoID: string) => {
    navigate(`/video/${videoID}`);
  };

  return (
    <ul className='flex flex-wrap mt-5'>
      {Video.map((video) => {
        return (
          <li
            onClick={() => onClickHandler(video._id)}
            key={video._id}
            className='w-1/2 p-2 h-60 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer rounded-lg transition duration-300 ease-in-out group hover:scale-90'
          >
            <img
              className='w-full min-h-full object-cover md:object-fill group-hover:opacity-40 rounded-lg'
              src={video.imageUrl}
              alt='thumbnail'
            />
            <p className='text-white opacity-0 text-center relative bottom-32 w-full transition-opacity group-hover:opacity-100 '>
              {video.videoName}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default VideosList;
