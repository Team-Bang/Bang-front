import React from 'react'
const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        placeholder='Enter Comment'
        name='reply'
        value={comment.reply}
        onChange={handleChange}
      />
    </div>
    <button>Submit Comment</button>
  </form>
)
export default CommentForm
