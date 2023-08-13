import { useNavigate } from 'react-router-dom';
import checkAuthStatus from '../../helpers/checkAuthStatus';
import { useEffect } from 'react';
import Header from '../components/header/Header';
import Profile from '../components/profile/Profile';

const ProfilePage = () => {
  const isLoggedIn = checkAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  {
    return isLoggedIn ? (
      <>
        <Header />
        <Profile />
      </>
    ) : (
      <></>
    );
  }
};

export default ProfilePage;
