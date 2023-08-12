import React, { ReactNode, createContext, useEffect, useState } from 'react';
import Users from '../../interfaces/users';
import Token from '../../interfaces/token';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from '../../config/config';

interface PageLayoutProps {
  children: ReactNode;
}

export const AuthContext = createContext<Users>({
  profilePicture: '',
  _id: '',
  email: '',
  username: '',
});

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<Users>({
    profilePicture: '',
    _id: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    fetchUserByToken();
  }, []);

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

  return (
    <AuthContext.Provider value={profile}>
      <div className='container mx-auto md:p-4'>{children}</div>
    </AuthContext.Provider>
  );
};

export default PageLayout;
