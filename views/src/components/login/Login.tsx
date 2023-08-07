import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../../interfaces/login';
import config from '../../../config/config';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Login>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${config.baseURL}:${config.port}/auth/login`,
        data
      );
      sessionStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400)
          setError(error.response?.data.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((previous) => ({
      ...previous,
      email: event.target.value,
    }));
  };

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((previous) => ({
      ...previous,
      password: event.target.value,
    }));
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col text-center space-y-4 p-12 sm:p-16 bg-slate-400 rounded-lg'
      >
        <h1 className='text-2xl'>Login</h1>
        <p className='text-red-700'>{error}</p>
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='text'
          name='email'
          id='email'
          placeholder='Email'
          required
          onChange={onChangeEmailHandler}
        />
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          required
          onChange={onChangePasswordHandler}
        />
        <button className='bg-green-600 rounded-2xl hover:bg-green-800'>
          Login
        </button>
        <p>
          Does not have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='underline cursor-pointer hover:text-blue-200'
          >
            register here
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;
