import React, { useContext, useState } from 'react';
import axios from 'axios';
import config from '../../../config/config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../layouts/PageLayout';

const Profile = () => {
  const Auth = useContext(AuthContext);
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState<
    string | null
  >(null);
  const navigation = useNavigate();

  const onClickChangeProfilePictureHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const formData = new FormData();
      formData.append('profilePicture', event.target.files[0]);

      try {
        await axios.put(
          `${config.baseURL}:${config.port}/users/profile-picture/${Auth._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const user = await axios.post(
          `${config.baseURL}:${config.port}/users/${Auth._id}`
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
          src={updatedProfilePicture || Auth.profilePicture}
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
          <p>Username : {Auth.username}</p>
          <p>Email : {Auth.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
