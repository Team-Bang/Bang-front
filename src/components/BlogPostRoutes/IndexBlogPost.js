import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { blogPostIndex } from '../../api/blogposts'
import Spinner from 'react-bootstrap/Spinner'

class BlogPostIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      blogposts: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    blogPostIndex(user)
      .then(res => this.setState({ blogposts: res.data.blogposts }))
      .then(() => msgAlert({
        heading: 'Loaded Blog Post!',
        message: 'All posts ',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load the posts!',
          message: 'the posts have an error' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { blogposts } = this.state
    if (!blogposts) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">loading</span>
        </Spinner>
      )
    }
    const blogpostJsx = blogposts.map(blogpost => (
      <Link to={`/blogposts/${blogpost._id}`} key={blogpost}>
        <li>
          {blogpost.title}
        </li>
      </Link>
    ))
    return (
      <div>
        <h3>Blog Post</h3>
        <ul>
          {blogpostJsx}
        </ul>
      </div>
    )
  }
}

export default withRouter(BlogPostIndex)
