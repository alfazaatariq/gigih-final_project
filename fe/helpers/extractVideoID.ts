const extractVideoID = (url: string) => {
  const startString = '/vi/';
  const endString = '/maxresdefault.jpg';

  const startIndex = url.indexOf(startString) + startString.length;
  const endIndex = url.indexOf(endString);

  const videoId = url.substring(startIndex, endIndex);

  return videoId;
};

export default extractVideoID;
