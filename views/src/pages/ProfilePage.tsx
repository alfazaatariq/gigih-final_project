import { useNavigate } from 'react-router-dom';
import checkAuthStatus from '../../helpers/checkAuthStatus';
import { useEffect } from 'react';

const ProfilePage = () => {
  const isLoggedIn = checkAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  {
    return isLoggedIn ? <p>Hello</p> : <></>;
  }
};

export default ProfilePage;
