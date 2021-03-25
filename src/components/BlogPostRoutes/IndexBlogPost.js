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
    // function getRandomBlog (max) {
    //   return Math.floor(Math.random() * Math.floor(max))
    // }

    const { blogposts } = this.state
    if (!blogposts) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">loading</span>
        </Spinner>
      )
    }
    const blogpostJsx = blogposts.map(blogpost => (
      <div className="card" key={blogpost._id}>
        <div className="card-body">
          <Link to={`/blogposts/${blogpost._id}`} key={blogpost._id}>
            <h4 className="card-title">{blogpost.title}</h4>
          </Link>
          <p className="card-text">this is a test</p>
          <p className="card-text"><small className="text-muted"><td input type={Date}>{blogpost.date.substring(0, 10)}</td></small></p>
        </div>
      </div>
    ))
    return (
      <div>
        <h3>Blog</h3>
        <h3>{blogpostJsx}</h3>
      </div>
    )
  }
}
export default withRouter(BlogPostIndex)
