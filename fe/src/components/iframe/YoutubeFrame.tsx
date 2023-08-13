const YoutubeFrame = ({ youtubeID }: { youtubeID: string }) => {
  return (
    <iframe
      className='w-full h-64 md:h-72 lg:h-96 rounded-lg'
      src={`https://www.youtube.com/embed/${youtubeID}`}
      title='YouTube video player'
      allow='autoplay;'
    ></iframe>
  );
};

export default YoutubeFrame;
