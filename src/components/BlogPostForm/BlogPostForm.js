import React from 'react'
const BlogPostForm = ({ blogpost, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Post Title</label>
    <input
      required
      placeholder='Enter Post Title'
      name='title'
      value={blogpost.title}
      onChange={handleChange}
    />
    <label>Post Body</label>
    <input
      required
      placeholder='Enter Post Body'
      name='body'
      value={blogpost.body}
      onChange={handleChange}
    />
    <button>Submit</button>
  </form>
)
export default BlogPostForm
