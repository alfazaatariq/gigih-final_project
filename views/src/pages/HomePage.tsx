import PageLayout from '../layouts/PageLayout';
import VideosList from '../components/videoslist/VideosList';

function HomePage() {
  return (
    <>
      <PageLayout>
        <VideosList />
      </PageLayout>
    </>
  );
}

export default HomePage;
