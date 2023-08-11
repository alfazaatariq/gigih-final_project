import { useState } from 'react';
import Comments from '../../../interfaces/comments';
import changeDateFormat from '../../../helpers/changeDateFormat';

const CommentsList = ({ comments }: { comments: Comments[] }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const onClickButtonHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ul id='comments-box' className='space-y-2 h-screen overflow-auto'>
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          return (
            <li
              className='even:bg-slate-600 rounded-lg odd:bg-transparent flex space-x-2'
              key={index}
            >
              <img
                className='w-7 h-7 object-cover rounded-lg'
                src={comment.profilePicture}
                alt={`${comment.username} Profile Picture`}
              />
              <div className='text-white  rounded-lg'>
                <p
                  className={
                    comment.isAnon ? 'text-red-400' : 'text-yellow-400'
                  }
                >
                  {comment.username}
                </p>
                <p className='break-words'>
                  {isCollapsed
                    ? comment.comment.slice(0, 250)
                    : comment.comment}{' '}
                  {comment.comment.length > 250 ? (
                    <button
                      className='hover:opacity-40 font-bold text-slate-400'
                      onClick={onClickButtonHandler}
                    >
                      {isCollapsed ? 'Read More...' : 'Show Less'}
                    </button>
                  ) : (
                    ''
                  )}
                  {/* {comment.comment.slice(0, 250)} */}
                </p>
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
