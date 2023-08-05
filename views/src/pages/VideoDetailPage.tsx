import extractVideoID from '../../helpers/extractVideoID';
import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoDetail from '../../interfaces/videoDetail';
import Products from '../../interfaces/products';
import Comments from '../../interfaces/comments';
import NewComment from '../../interfaces/newComment';
import { io } from 'socket.io-client';
import config from '../../config/config';
import YoutubeFrame from '../components/iframe/YoutubeFrame';
import BackButton from '../components/buttons/BackButton';
import { useNavigate } from 'react-router-dom';
import ProductsList from '../components/products-list/ProductsList';
import CommentsList from '../components/comments-list/CommentsList';
import sortComments from '../../helpers/sortComments';

const VideoDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoID = location.pathname.split('/video/')[1];
  const [videoDetail, setVideoDetail] = useState<VideoDetail>({
    _id: '',
    imageUrl: '',
    __v: 0,
  });
  const [products, setProducts] = useState<Products[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState<NewComment>({
    _videoId: videoID,
    username: 'Testing',
    comment: '',
  });
  const youtubeID = extractVideoID(videoDetail.imageUrl);

  useEffect(() => {
    // Call the fetchVideoByID function when the component mounts
    fetchVideoByID(videoID);
    fetchProductsByID(videoID);
    fetchCommentsByID(videoID);
  }, [videoID]);

  const socket = io(`${config.baseURL}:${config.port}`, {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
      // socket.emit('join-room', videoID);
    });

    socket.on('connect_error', (error) => {
      console.log('Error connecting to the Socket.IO server:', error.message);
    });
    socket.on('received-comment', (sortedComments, room) => {
      if (room === videoID) setComments(sortedComments);
    });
  }, [socket, videoID]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post(`${config.baseURL}:${config.port}/comments`, newComment);
      const res = await axios.get(
        `${config.baseURL}:${config.port}/comments/${videoID}`
      );

      const sortedComments = sortComments(res.data.comments, 'asc');

      socket.emit('comment', sortedComments, videoID);

      setNewComment((previous) => ({
        ...previous,
        username: '',
        comment: '',
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment((previous) => ({
      ...previous,
      comment: event.target.value,
    }));
  };

  const onChangeUsernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewComment((previous) => ({
      ...previous,
      username: event.target.value,
    }));
  };

  const fetchCommentsByID = async (videoID: string) => {
    try {
      const res = await axios.get(
        `${config.baseURL}:${config.port}/comments/${videoID}`
      );
      const sortedComments = sortComments(res.data.comments, 'asc');
      setComments(sortedComments);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

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
        <div className='w-full relative -top-8 sm:top-4'>
          <YoutubeFrame youtubeID={youtubeID} />

          <div>
            <div className='text-white'>
              <div
                onClick={() => navigate('/')}
                className='w-8 cursor-pointer hover:bg-slate-400'
              >
                <BackButton color='white' />
              </div>
            </div>
            <h2 className='text-white'>Product List</h2>
            <ProductsList products={products} />
          </div>

          {/* comments */}
          <div className='mt-4'>
            <form className='space-y-4' onSubmit={onSubmitHandler}>
              <input
                type='text'
                name='username'
                id='username'
                maxLength={10}
                placeholder='username'
                required
                value={newComment.username}
                onChange={onChangeUsernameHandler}
              />
              <div>
                <textarea
                  name='comment'
                  id='comment'
                  rows={1}
                  placeholder='add a comment...'
                  required
                  value={newComment.comment}
                  onChange={onChangeCommentHandler}
                  className='w-full bg-transparent outline-none border-b border-slate-600 text-white pt-2 focus:border-slate-100 transition duration-150 ease-linear resize-none'
                ></textarea>

                <div className='flex space-x-2 justify-end mt-2'>
                  <button
                    className='bg-transparent text-white rounded-xl px-2 py-1 text-sm hover:bg-slate-400'
                    type='submit'
                  >
                    Cancel
                  </button>
                  <button
                    className='bg-slate-100 rounded-xl px-2 py-1 text-sm hover:bg-slate-400'
                    type='submit'
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>
            <CommentsList comments={comments} />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default VideoDetailPage;
