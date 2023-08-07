import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='flex flex-col text-center space-y-4 p-12 sm:p-16 bg-slate-400 rounded-lg'>
        <h1 className='text-2xl'>Register</h1>
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='text'
          name='username'
          id='username'
          placeholder='Username'
        />
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='text'
          name='email'
          id='email'
          placeholder='Email'
        />
        <input
          className='rounded-md px-2 outline-blue-400 text-slate-800'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
        />
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
      </div>
    </>
  );
};

export default Register;
