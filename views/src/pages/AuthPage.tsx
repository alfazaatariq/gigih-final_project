import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';

const AuthPage = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  return (
    <PageLayout>
      <div className='text-white flex flex-col justify-center items-center min-h-screen px-2'>
        <h1
          onClick={() => navigation('/')}
          className='text-white hover:opacity-40 font-borel text-4xl cursor-pointer mb-4'
        >
          SHOPEDIA
        </h1>
        {pathname === '/login' ? <Login /> : <Register />}
      </div>
    </PageLayout>
  );
};

export default AuthPage;
