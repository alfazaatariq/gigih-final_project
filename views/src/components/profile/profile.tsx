import { useNavigate } from 'react-router-dom';
import Users from '../../../interfaces/users';

const Profile = ({ profile }: { profile: Users }) => {
  const navigation = useNavigate();

  const onClickLogoutHandler = () => {
    sessionStorage.removeItem('token');
    navigation('/login');
  };

  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='text-center space-y-2'>
        <h1 className='text-white'>My Profile</h1>
        <img
          className='w-44'
          src='/profile-pictures/pp.png'
          alt='profile-picture'
        />
        <div className='flex flex-col space-y-2'>
          <button className='bg-green-800 p-1 rounded-lg text-white hover:bg-green-600'>
            Change Picture
          </button>
          <button
            onClick={() => onClickLogoutHandler()}
            className='bg-red-800 p-1 rounded-lg text-white hover:bg-red-600'
          >
            Logout
          </button>
        </div>
        <p className='text-white'>Email :</p>
        <p className='text-white bg-slate-800 rounded-md p-2'>
          {profile.email}
        </p>
        <p className='text-white'>Username :</p>
        <p className='text-white bg-slate-800 rounded-md p-2'>
          {profile.username}
        </p>
      </div>
    </div>
  );
};

export default Profile;
