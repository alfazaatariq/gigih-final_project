import Comments from '../interfaces/comments';

const sortComments = (comments: Comments[], sortType: string): Comments[] => {
  if (sortType.toLowerCase() === 'asc') {
    comments.sort(
      (a: Comments, b: Comments) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (sortType.toLowerCase() === 'dsc') {
    comments.sort(
      (a: Comments, b: Comments) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return comments;
};

export default sortComments;
