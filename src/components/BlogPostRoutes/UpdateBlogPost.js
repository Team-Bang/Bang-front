import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import BlogPostForm from '../BlogPostForm/BlogPostForm'

import { blogPostUpdate } from '../../api/blogposts'

class BlogPostUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogpost: {
        title: '',
        body: ''
      },
      updated: false
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

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { blogpost } = this.state
    blogPostUpdate(match.params.id, blogpost, user)
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated Post Successfully',
        message: 'Updated Post',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to update post',
          message: 'Could not update posts with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { blogpost, updated } = this.state
    if (updated) {
      return <Redirect to={'/'} />
    }

    return (
      <div>
        <h3>Update Post</h3>
        <BlogPostForm
          blogpost={blogpost}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(BlogPostUpdate)
