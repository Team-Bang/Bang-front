import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { blogPostIndex } from '../../api/blogposts'
import Spinner from 'react-bootstrap/Spinner'

const cardContainerLayout = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline'
}

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
    function getRandomBlog (max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

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
        <Link to={`/blogposts/${blogpost._id}`} key={blogpost._id}>
          <div className="card-body">
            <h4 className="card-title">{blogpost.title}</h4>
            <p className="card-text">this is a test</p>
            <p className="card-text"><small className="text-muted">Created: {blogpost.date.substring(0, 10)}</small></p>
          </div>
        </Link>
      </div>

    ))
    return (
      <div style={cardContainerLayout}>
        <div className="container" id="indexPage-message">Check out these bangers!
          <div className="row">
            <div className="col-sm">
              <h6>{blogpostJsx[getRandomBlog(blogpostJsx.length)]}</h6>
            </div>
            <div className="col-sm">
              <h6>{blogpostJsx[getRandomBlog(blogpostJsx.length)]}</h6>
            </div>
            <div className="col-sm">
              <h6>{blogpostJsx[getRandomBlog(blogpostJsx.length)]}</h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(BlogPostIndex)
