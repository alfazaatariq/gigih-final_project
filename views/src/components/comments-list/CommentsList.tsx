import Comments from '../../../interfaces/comments';
import changeDateFormat from '../../../helpers/changeDateFormat';

const CommentsList = ({ comments }: { comments: Comments[] }) => {
  return (
    <ul id='comments-box' className='space-y-2 h-screen overflow-auto'>
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          return (
            <li className='even:bg-slate-600 odd:bg-transparent' key={index}>
              <div className='text-white  p-2 rounded-lg'>
                <p className={comment.isAnon ? 'text-red-400' : 'text-white'}>
                  {comment.username}
                </p>
                <p>{comment.comment}</p>
                <p>{changeDateFormat(comment.updatedAt, 'time')}</p>
                <p>{changeDateFormat(comment.updatedAt, 'date')}</p>
              </div>
            </li>
          );
        })
      ) : (
        <div className='text-white text-center'>Its empty here </div>
      )}
    </ul>
  );
};

export default CommentsList;
