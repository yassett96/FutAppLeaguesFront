import React from 'react';

const CommentForm = ({ comment, onCommentChange }) => {
  return (
    <textarea
      className="w-[90%] sm750:w-3/5 h-48 p-2 border border-gray-300 rounded mx-auto block text-black"
      value={comment}
      onChange={(e) => onCommentChange(e.target.value)}
    ></textarea>
  );
};

export default CommentForm;