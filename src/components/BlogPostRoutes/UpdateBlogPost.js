import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
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
    const { blogposts } = this.state
    blogPostUpdate(match.params.id, blogposts, user)
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
    const { blogposts, updated } = this.state
    if (!blogposts) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    if (updated) {
      return <Redirect to={`/blogposts/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <h3>Update Post</h3>
        <BlogPostForm
          blogpost={blogposts}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(BlogPostUpdate)
