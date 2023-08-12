import checkAuthStatus from '../../helpers/checkAuthStatus';
import extractVideoID from '../../helpers/extractVideoID';
import React, { useEffect, useState, useRef } from 'react';
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
import Header from '../components/header/Header';
import jwtDecode from 'jwt-decode';
import Token from '../../interfaces/token';

const socket = io(`${config.baseURL}:${config.port}`, {
  transports: ['websocket'],
});

const VideoDetailPage = () => {
  const isLoggedIn = checkAuthStatus();
  const commentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const videoID = location.pathname.split('/video/')[1];
  const [isCommenting, setIsCommenting] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [videoDetail, setVideoDetail] = useState<VideoDetail>({
    _id: '',
    imageUrl: '',
    __v: 0,
  });

  const [newComment, setNewComment] = useState<NewComment>({
    _videoId: videoID,
    profilePicture: '',
    _userId: '',
    isAnon: true,
    username: '',
    comment: '',
  });

  const youtubeID = extractVideoID(videoDetail.imageUrl);

  useEffect(() => {
    const isCommenting = (event: MouseEvent) => {
      if (!commentRef.current?.contains(event.target as Node)) {
        setIsCommenting(false);
      }
    };

    document.addEventListener('mousedown', isCommenting);

    return () => {
      document.removeEventListener('mousedown', isCommenting);
    };
  });

  useEffect(() => {
    // Call the fetchVideoByID function when the component mounts
    fetchUserByToken();
    fetchVideoByID(videoID);
    fetchProductsByID(videoID);
    fetchCommentsByID(videoID);
  }, [videoID]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socket.on('connect_error', (error) => {
      console.log('Error connecting to the Socket.IO server:', error.message);
    });
    socket.on('received-comment', (sortedComments, room) => {
      if (room === videoID) setComments(sortedComments);
    });
  }, [videoID]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post(
        `${config.baseURL}:${config.port}/comments/${videoID}`,
        newComment
      );
      const res = await axios.get(
        `${config.baseURL}:${config.port}/comments/${videoID}`
      );

      const sortedComments = sortComments(res.data.comments, 'asc');

      socket.emit('comment', sortedComments, videoID);

      if (isLoggedIn) {
        setNewComment((previous) => ({
          ...previous,
          comment: '',
        }));
      } else {
        setNewComment((previous) => ({
          ...previous,
          username: '',
          comment: '',
        }));
      }
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
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const onChangeUsernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewComment((previous) => ({
      ...previous,
      username: event.target.value,
    }));
  };

  const fetchUserByToken = async () => {
    const token: string | null = sessionStorage.getItem('token');

    if (token) {
      const decodedToken: Token = jwtDecode(token);
      try {
        const res = await axios.post(
          `${config.baseURL}:${config.port}/users/${decodedToken.user_id}`
        );

        console.log(res);

        setNewComment((previous) => ({
          ...previous,
          _userId: res.data.user._id,
          profilePicture: res.data.user.profilePicture,
          isAnon: false,
          username: res.data.user.username,
        }));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
        } else {
          console.error('Unknown error occurred:', error);
        }
      }
    } else {
      console.log('Token not available.'); // Handle the case where token is null
      setNewComment((previous) => ({
        ...previous,
        _userId: '',
        profilePicture: 'default.jpg',
      }));
    }
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
      {/* Display the video details */}
      <Header />
      <div className='w-full relative -top-8 sm:top-4'>
        <YoutubeFrame youtubeID={youtubeID} />

        <div className='mt-2'>
          <div className='text-white'>
            <div
              onClick={() => navigate('/')}
              className='w-8 cursor-pointer hover:opacity-40'
            >
              <BackButton color='white' />
            </div>
          </div>
          <h2 className='text-white'>Product List</h2>
          <ProductsList products={products} />
        </div>

        {/* comments */}
        <div className='mt-4'>
          <form className='space-y-4 my-4' onSubmit={onSubmitHandler}>
            {isLoggedIn ? (
              <></>
            ) : (
              <input
                type='text'
                name='username'
                id='username'
                maxLength={20}
                placeholder='username'
                required
                autoComplete='off'
                value={newComment.username}
                className='w-full bg-transparent outline-none border-b border-slate-600 text-white pt-2 focus:border-slate-100 transition duration-150 ease-linear resize-none'
                onChange={onChangeUsernameHandler}
              />
            )}
            <div ref={commentRef}>
              <div className={isLoggedIn ? 'flex space-x-2' : ''}>
                <img
                  className={`w-7 h-7 object-cover rounded-lg ${
                    isLoggedIn ? '' : 'hidden'
                  }`}
                  src={newComment.profilePicture}
                  alt={`${newComment.username} Profile Picture`}
                />
                <textarea
                  onClick={() => setIsCommenting(!isCommenting)}
                  name='comment'
                  id='comment'
                  rows={1}
                  maxLength={4500}
                  placeholder='add a comment...'
                  required
                  value={newComment.comment}
                  onChange={onChangeCommentHandler}
                  className={`w-full ${
                    !isCommenting ? 'overflow-hidden' : 'overflow-auto'
                  } ${
                    newComment.comment.length > 0 ? 'max-h-64' : 'max-h-7'
                  } bg-transparent outline-none border-b border-slate-600 text-white pt-2 focus:border-slate-100 transition duration-150 ease-linear resize-none`}
                ></textarea>
              </div>

              <div
                className={
                  isCommenting ? 'flex space-x-2 justify-end mt-2' : 'invisible'
                }
              >
                <button
                  className='bg-transparent text-white rounded-xl px-2 py-1 text-sm hover:bg-slate-400'
                  type='button'
                  onClick={() => {
                    setIsCommenting(!isCommenting);
                    setNewComment((previous) => ({
                      ...previous,
                      comment: '',
                    }));
                  }}
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
    </>
  );
};

export default VideoDetailPage;
