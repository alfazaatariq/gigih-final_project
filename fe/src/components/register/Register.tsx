import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import SeePasswordButton from '../buttons/SeePasswordButton';
import useInput from '../../../hooks/useInput';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const usernameInput = useInput();
  const emailInput = useInput();
  const passwordInput = useInput();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      });
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409)
          setError(error.response?.data.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col text-center space-y-4 p-12 sm:p-16 bg-slate-400 rounded-lg'
      >
        <h1 className='text-2xl'>Register</h1>
        <p className='text-red-700'>{error}</p>
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          maxLength={20}
          required
          {...usernameInput}
        />
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='text'
          name='email'
          maxLength={35}
          id='email'
          placeholder='Email'
          required
          {...emailInput}
        />
        <div className='flex items-center relative'>
          <input
            className='w-full rounded-md px-2 pr-7 outline-blue-400 text-slate-800'
            type={visible ? 'text' : 'password'}
            name='password'
            id='password'
            placeholder='Password'
            maxLength={20}
            required
            {...passwordInput}
          />
          <div
            onClick={() => setVisible(!visible)}
            className='w-4 absolute right-1 cursor-pointer hover:opacity-40'
          >
            <SeePasswordButton visible={visible} color='black' />
          </div>
        </div>
        <button className='bg-green-600 rounded-2xl hover:bg-green-800'>
          Register
        </button>
        <p>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='underline cursor-pointer hover:text-blue-200'
          >
            login here
          </span>
        </p>
      </form>
    </>
  );
};

export default Register;
