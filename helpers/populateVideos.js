import video from '../models/videos.js';

const populateVideos = async () => {
  const videos = [
    {
      imageUrl:
        // iPhone 14 Pro
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
    },
    {
      imageUrl:
        // Steam Deck
        'https://i.ytimg.com/vi/6A6C51G0ZQ8/maxresdefault.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCmD3GDamatz0pJos6pCJ4CxHsr6Q',
    },
    {
      imageUrl:
        // Macbook Pro M1 13inch
        'https://i.ytimg.com/vi/x1eG_8aasoY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
    },
    {
      imageUrl:
        // Lenovo ThinkPad X1 Carbon Gen 11
        'https://i.ytimg.com/vi/5neWqgxOFTY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
    },
    {
      imageUrl:
        // PS5
        'https://i.ytimg.com/vi/uLwFYPsS_Zc/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA',
    },
  ];

  try {
    await video.insertMany(videos);
  } catch (error) {
    console.log(error);
  }
};

export default populateVideos;
