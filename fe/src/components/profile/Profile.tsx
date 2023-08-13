import React, { useState, useEffect } from 'react';
import axios, { CancelToken } from 'axios';
import { useNavigate } from 'react-router-dom';
import Users from '../../../interfaces/users';
import jwtDecode from 'jwt-decode';
import Token from '../../../interfaces/token';

const Profile = () => {
  const [profile, setProfile] = useState<Users>({
    profilePicture: '',
    _id: '',
    email: '',
    username: '',
  });
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState<
    string | null
  >(null);
  const navigation = useNavigate();

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

  const onClickChangeProfilePictureHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const formData = new FormData();
      formData.append('profilePicture', event.target.files[0]);

      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/users/profile-picture/${
            profile._id
          }`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const user = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/${profile._id}`
        );

        setUpdatedProfilePicture(user.data.user.profilePicture);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
        } else {
          console.error('Unknown error occurred:', error);
        }
      }
    }
  };

  const onClickLogoutHandler = () => {
    sessionStorage.removeItem('token');
    navigation('/login');
  };

  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='text-center space-y-2'>
        <h1 className='text-white'>My Profile</h1>
        <img
          className='w-44 h-44 object-cover mx-auto rounded-lg'
          src={updatedProfilePicture || profile.profilePicture}
          alt='profile-picture'
        />
        <form encType='multipart/form-data'>
          <div className='flex flex-col space-y-2'>
            <label className='text-white' htmlFor='file'>
              Change Profile Picture
            </label>
            <input
              type='file'
              name='file'
              accept='.png, .jpg, .jpeg'
              id='file'
              className='cursor-pointer hover:opacity-40 bg-green-800 text-white rounded-lg'
              onChange={onClickChangeProfilePictureHandler}
            />
            <button
              onClick={onClickLogoutHandler}
              className='bg-red-800 p-1 rounded-lg text-white hover:bg-red-600'
            >
              Logout
            </button>
          </div>
        </form>

        <div className='text-white'>
          <p>Username : {profile.username}</p>
          <p>Email : {profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
