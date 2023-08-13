import video from '../models/videos.js';

const populateVideos = async () => {
  const videos = [
    {
      imageUrl:
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'iPhone 14 Pro',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/6A6C51G0ZQ8/maxresdefault.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCmD3GDamatz0pJos6pCJ4CxHsr6Q',
      videoName: 'Steam Deck',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/x1eG_8aasoY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'Macbook Pro M1',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/5neWqgxOFTY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'Lenovo ThinkPad X1 Carbon Gen 11',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/uLwFYPsS_Zc/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'PS5',
    },
    {
      imageUrl:
        // Redmi Note 12 Pro
        'https://i.ytimg.com/vi/EE8vxw8YF-I/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'Redmi Note 12 Pro',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/ZYxz9uAmodg/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'Apple Watch Series 8',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/qGexZ8Vq9tk/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'iPad 9th Gen',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/blIYSm7L4oY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'Samsung Flip 4',
    },
    {
      imageUrl:
        'https://i.ytimg.com/vi/CHQ6fqsXdig/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
      videoName: 'AirPods Pro 2',
    },
  ];

  try {
    await video.insertMany(videos);
  } catch (error) {
    console.log(error);
  }
};

export default populateVideos;
