import PageLayout from '../layouts/PageLayout';
import VideosList from '../components/videoslist/VideosList';
import Header from '../components/header/Header';

function HomePage() {
  return (
    <>
      <PageLayout>
        <Header />
        <VideosList />
      </PageLayout>
    </>
  );
}

export default HomePage;
