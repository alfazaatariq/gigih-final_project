import Login from '../components/login/Login';
import Register from '../components/register/Register';
import { useLocation } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';

const AuthPage = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <div className='text-white flex justify-center items-center min-h-screen'>
        {pathname === '/login' ? <Login /> : <Register />}
      </div>
    </PageLayout>
  );
};

export default AuthPage;
