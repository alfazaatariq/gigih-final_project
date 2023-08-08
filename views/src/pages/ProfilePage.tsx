import { useNavigate } from 'react-router-dom';
import checkAuthStatus from '../../helpers/checkAuthStatus';
import { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import Header from '../components/header/Header';
import Profile from '../components/profile/Profile';
import config from '../../config/config';
import axios from 'axios';
import Users from '../../interfaces/users';
import jwtDecode from 'jwt-decode';
import Token from '../../interfaces/token';

const ProfilePage = () => {
  const isLoggedIn = checkAuthStatus();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Users>({
    profilePicture: '',
    _id: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    fetchUserByToken();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const fetchUserByToken = async () => {
    const token: string | null = sessionStorage.getItem('token');

    if (token) {
      const decodedToken: Token = jwtDecode(token);
      try {
        const res = await axios.post(
          `${config.baseURL}:${config.port}/users/${decodedToken.user_id}`
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

  {
    return isLoggedIn ? (
      <PageLayout>
        <Header />
        <Profile profile={profile} />
      </PageLayout>
    ) : (
      <></>
    );
  }
};

export default ProfilePage;
