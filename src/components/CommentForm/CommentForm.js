import React from 'react'
const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <textarea className="form-control" rows="3"
        placeholder='Enter Comment'
        name='comment'
        value={comment.reply}
        onChange={handleChange}
      />
    </div>
    <button>Submit Comment</button>
  </form>
)
export default CommentForm
