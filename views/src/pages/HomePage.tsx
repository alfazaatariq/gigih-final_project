import PageLayout from '../layouts/PageLayout';
import VideosList from '../components/videoslist/VideosList';
import Header from '../components/header/Header';

function HomePage() {
  return (
    <>
      <PageLayout>
        <Header />
        {/* search */}
        <div className='flex mt-4 space-x-2 mx-2'>
          <input
            className='w-full outline-none rounded-md px-2 md:block md:grow'
            type='text'
            name='search'
            placeholder='Search videos you are looking for'
            id='search'
          />
          {/* <img
            className='w-7 h-7 cursor-pointer hover:bg-slate-500 rounded-md transition duration-150 ease-in-out p-1'
            src='/search/search-icon.png'
            alt='search'
          /> */}
        </div>
        <VideosList />
      </PageLayout>
    </>
  );
}

export default HomePage;
