import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className='p-4 bg-gradient-to-b from-slate-900 to-purple-950 min-h-screen text-white flex justify-center items-center'>
        <div>ERROR PAGE</div>
      </div>
    </>
  );
};

export default ErrorPage;
