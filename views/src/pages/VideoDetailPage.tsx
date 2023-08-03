import extractVideoID from '../../helpers/extractVideoID';
import { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoDetail from '../../interfaces/videoDetail';
import Products from '../../interfaces/products';
import { io } from 'socket.io-client';
import config from '../../config/config';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

const VideoDetailPage = () => {
  const [videoDetail, setVideoDetail] = useState<VideoDetail>({
    _id: '',
    imageUrl: '',
    __v: 0,
  });
  const [products, setProducts] = useState<Products[]>([]);
  const location = useLocation();
  const youtubeID = extractVideoID(videoDetail.imageUrl);
  const videoID = location.pathname.split('/video/')[1];

  useEffect(() => {
    // Call the fetchVideoByID function when the component mounts
    fetchVideoByID(videoID);
    fetchProductsByID(videoID);

    // transports is important
    const socket = io(`${config.baseURL}:${config.port}`, {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });
    socket.on('connect_error', (error) => {
      console.log('Error connecting to the Socket.IO server:', error.message);
    });
  }, [videoID]);

  const fetchProductsByID = async (videoID: string) => {
    try {
      const res = await axios.get(
        `${config.baseURL}:${config.port}/products/${videoID}`
      );
      setProducts(res.data.products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const fetchVideoByID = async (videoID: string) => {
    try {
      const res = await axios.get(
        `${config.baseURL}:${config.port}/videos/${videoID}`
      );
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

          <div>
            <h2 className='text-white'>Product List</h2>
            <div>
              <ul className='flex items-center space-x-2 overflow-auto bg-slate-900 py-2'>
                {products.map((product) => {
                  return (
                    <a key={product._id} href={product.link}>
                      <li>
                        <div className='text-white bg-slate-700 rounded-lg p-2 cursor-pointer'>
                          <p className='line-clamp-1'>{product.name}</p>
                          <p>Rp.{product.price}</p>
                        </div>
                      </li>
                    </a>
                  );
                })}
              </ul>
            </div>
            {/* <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper> */}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default VideoDetailPage;
