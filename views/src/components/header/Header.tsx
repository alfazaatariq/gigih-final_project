import { useNavigate, useLocation } from 'react-router-dom';
import checkAuthStatus from '../../../helpers/checkAuthStatus';
import { AuthContext } from '../../layouts/PageLayout';
import { useContext } from 'react';

const Header = () => {
  const Auth = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoggedIn = checkAuthStatus();
  const navigation = useNavigate();

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
            Auth.username
          ) : (
            <p className='underline underline-offset-4'>Sign In</p>
          )}
        </span>
        <img
          onClick={() => navigation('/profile')}
          className='w-7 h-7 object-cover rounded-md md:block'
          src={
            Auth.profilePicture
              ? Auth.profilePicture
              : '/profile-pictures/default.png'
          }
          alt='profile-picture'
        />
      </div>
    </div>
  );
};

export default Header;
