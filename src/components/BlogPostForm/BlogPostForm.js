import React from 'react'
const BlogPostForm = ({ blogpost, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <textarea className="form-control" rows="3"
        required
        placeholder='Enter Post Title'
        name='title'
        value={blogpost.title}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control"
        required
        placeholder='Enter Author Name'
        name='authorName'
        value={blogpost.authorName}
        onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label></label>
      <textarea className="form-control" id="blog-body-form" rows="5"
        required
        placeholder='Enter Post Body'
        name='body'
        value={blogpost.body}
        onChange={handleChange}></textarea>
    </div>
    <button>Submit</button>
  </form>
)
export default BlogPostForm
