import './App.css';
import PageLayout from './layouts/PageLayout';
import VideosList from './components/videoslist/VideosList';

function App() {
  return (
    <>
      <PageLayout>
        <VideosList />
      </PageLayout>
    </>
  );
}

export default App;
