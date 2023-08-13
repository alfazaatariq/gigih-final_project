import comment from '../models/comments.js';
import findVideoId from './findVideoId.js';

const populateComments = async () => {
  const comments = [
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      username: 'User 1',
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit nobis voluptate architecto voluptatem mollitia?',
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/6A6C51G0ZQ8/maxresdefault.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCmD3GDamatz0pJos6pCJ4CxHsr6Q'
      ),
      username: 'User 2',
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit nobis voluptate architecto voluptatem mollitia?',
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/x1eG_8aasoY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      username: 'User 3',
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit nobis voluptate architecto voluptatem mollitia?',
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/5neWqgxOFTY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      username: 'User 4',
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit nobis voluptate architecto voluptatem mollitia?',
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/uLwFYPsS_Zc/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      username: 'User 5',
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit nobis voluptate architecto voluptatem mollitia?',
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      username: 'User 69',
      comment:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum provident eligendi nobis? Velit non magni ut facere quasi excepturi at asperiores aspernatur nesciunt ea repellendus vel dignissimos placeat qui similique minima recusandae reiciendis, odio, et, mollitia architecto. Maxime, sunt harum?',
    },
  ];

  try {
    await comment.insertMany(comments);
  } catch (error) {
    console.log(error);
  }
};

export default populateComments;
