import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import BlogPostForm from '../BlogPostForm/BlogPostForm'
import { blogPostCreate } from '../../api/blogposts'

class BlogPostCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogpost: {
        title: '',
        body: ''
      },
      createdPostId: null
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        blogpost: { ...state.blogpost, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { blogpost } = this.state
    blogPostCreate(blogpost, user)
      .then(res => this.setState({ createdPostId: res.data.blogpost._id }))
      .then(() => msgAlert({
        heading: 'Created Post Successfully',
        message: 'Showing created post',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create post',
          message: 'Could not create post with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { blogpost, createdPostId } = this.state
    if (createdPostId) {
      return <Redirect to={`/blogposts/${createdPostId}`} />
    }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create Blog Post</h3>
          <BlogPostForm
            blogpost={blogpost}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
export default BlogPostCreate
