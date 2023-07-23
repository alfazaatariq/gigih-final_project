import product from '../models/products.js';
import video from '../models/videos.js';
import findVideoId from './findVideoId.js';

const populateProducts = async () => {
  const products = [
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      name: 'iPhone 14 Pro',
      link: 'https://tokopedia.link/0dujrW78EBb',
      price: 17009000,
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      name: 'casan iphone',
      link: 'https://tokopedia.link/0dujrW78EBb',
      price: 2000,
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/6A6C51G0ZQ8/maxresdefault.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCmD3GDamatz0pJos6pCJ4CxHsr6Q'
      ),
      name: 'Steam Deck',
      link: 'https://tokopedia.link/BqShl0i9EBb',
      price: 6882000,
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/x1eG_8aasoY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      name: 'Macbook Pro M1 13inch',
      link: 'https://tokopedia.link/mjZO5nt9EBb',
      price: 14945000,
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/5neWqgxOFTY/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      name: 'Lenovo ThinkPad X1 Carbon Gen 11',
      link: 'https://tokopedia.link/eJ77qGD9EBb',
      price: 33650000,
    },
    {
      _videoId: await findVideoId(
        'https://i.ytimg.com/vi/uLwFYPsS_Zc/maxresdefault.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLS5hqvj82AOzcdNp1ucHJ9ARzFA'
      ),
      name: 'Playstation 5',
      link: 'https://tokopedia.link/UeD8sAS9EBb',
      price: 6686884,
    },
  ];

  try {
    await product.insertMany(products);
  } catch (error) {
    console.log(error);
  }
};

export default populateProducts;
