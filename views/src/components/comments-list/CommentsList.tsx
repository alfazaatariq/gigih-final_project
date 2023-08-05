import Comments from '../../../interfaces/comments';

const CommentsList = ({ comments }: { comments: Comments[] }) => {
  return (
    <ul id='comments-box' className='space-y-2 h-screen overflow-auto'>
      {comments
        ? comments.map((comment, index) => {
            return (
              <li key={index}>
                <div className='text-white bg-slate-700 p-2 rounded-lg m-2'>
                  <p>{comment.username}</p>
                  <p>{comment.comment}</p>
                  <p>{comment.createdAt}</p>
                  <p>{comment.updatedAt}</p>
                </div>
              </li>
            );
          })
        : ''}
    </ul>
  );
};

export default CommentsList;
