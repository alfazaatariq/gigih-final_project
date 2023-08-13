import axios, { CancelToken } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import checkAuthStatus from '../../../helpers/checkAuthStatus';
import Token from '../../../interfaces/token';
import jwtDecode from 'jwt-decode';
import Users from '../../../interfaces/users';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoggedIn = checkAuthStatus();
  const navigation = useNavigate();

  const [profile, setProfile] = useState<Users>({
    profilePicture: '',
    _id: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    fetchUserByToken(cancelToken.token);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const fetchUserByToken = async (cancelToken: CancelToken) => {
    const token: string | null = sessionStorage.getItem('token');

    if (token) {
      const decodedToken: Token = jwtDecode(token);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/${decodedToken.user_id}`,
          null,
          { cancelToken: cancelToken }
        );

        setProfile((previous) => ({
          ...previous,
          _id: res.data.user._id,
          email: res.data.user.email,
          username: res.data.user.username,
          profilePicture: res.data.user.profilePicture,
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
    }
  };

  return (
    <div className='flex items-center justify-between mt-2 flex-wrap space-x-2 mx-2'>
      {/* logo */}
      <h1
        onClick={() => navigation('/')}
        className='text-white hover:opacity-40 font-borel h-3 cursor-pointer'
      >
        SHOPEDIA
      </h1>
      {/* profile */}
      <div
        onClick={() => navigation('/profile')}
        className={`flex hover:opacity-40 space-x-2 items-center cursor-pointer ${
          currentPath.includes('/profile') ? 'invisible' : 'visible'
        }`}
      >
        <span className='text-white text-sm'>
          {isLoggedIn ? (
            profile.username
          ) : (
            <p className='underline underline-offset-4'>Sign In</p>
          )}
        </span>
        <img
          onClick={() => navigation('/profile')}
          className='w-7 h-7 object-cover rounded-md md:block'
          src={
            profile.profilePicture
              ? profile.profilePicture
              : '/profile-pictures/default.png'
          }
          alt='profile-picture'
        />
      </div>
    </div>
  );
};

export default Header;
