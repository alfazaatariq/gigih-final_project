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

// transports is important
const socket = io(`${config.baseURL}:${config.port}`, {
  transports: ['websocket'],
});

const VideoDetailPage = () => {
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
    username: '',
    comment: '',
  });
  const youtubeID = extractVideoID(videoDetail.imageUrl);

  useEffect(() => {
    // Call the fetchVideoByID function when the component mounts
    fetchVideoByID(videoID);
    fetchProductsByID(videoID);
    fetchCommentsByID(videoID);

    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });
    socket.on('connect_error', (error) => {
      console.log('Error connecting to the Socket.IO server:', error.message);
    });

    socket.on('received-comment', (data) => {
      // console.log(data);
      console.log(data);
    });
  }, [videoID]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('username')?.setAttribute('value', '');
    document.getElementById('comment')?.setAttribute('value', '');

    setNewComment((previous) => ({
      ...previous,
      _videoId: videoID,
    }));

    socket.emit('comment', newComment);

    setNewComment((previous) => ({
      ...previous,
      username: '',
      comment: '',
    }));
  };

  const onChangeCommentHandler = (
    event: React.ChangeEvent<HTMLInputElement>
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
      setComments(res.data.comments);
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
          </div>

          {/* comments */}
          <div id='comment-box'>
            <div>
              <form onSubmit={onSubmitHandler}>
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
                <br />
                <br />
                <input
                  type='text'
                  name='comment'
                  id='comment'
                  maxLength={200}
                  placeholder='type your comment'
                  required
                  value={newComment.comment}
                  onChange={onChangeCommentHandler}
                />
                <br />
                <br />
                <button className='bg-slate-100 p-2' type='submit'>
                  Add Comment
                </button>
              </form>
            </div>
            <div>
              <ul className='space-y-2'>
                {comments.map((comment, index) => {
                  return (
                    <li key={index}>
                      <div className='text-white bg-slate-700 p-2 rounded-lg m-2'>
                        <p>{comment.username}</p>
                        <p>{comment.comment}</p>
                        <p>{comment.createdAt}</p>
                        <p>{comment.updatedAt}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default VideoDetailPage;
