import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { blogPostIndex } from '../../api/blogposts'
import Spinner from 'react-bootstrap/Spinner'

const cardContainerLayout = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline'
}
const h6BlogStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

class AllBlogPost extends Component {
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
        message: 'All posts',
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
      <div className="card" key={blogpost._id}>
        <Link to={`/blogposts/${blogpost._id}`} key={blogpost._id}>
          <div className="card-body">
            <h4 className="card-title">{blogpost.title}</h4>
            <p className="card-text">{blogpost.authorName}</p>
            <p className="card-text">{blogpost.body}</p>
            <p className="card-text"><small className="text-muted">Created: {blogpost.date.substring(0, 10)}</small></p>
          </div>
        </Link>
      </div>

    ))
    return (
      <div style={cardContainerLayout}>
        <h6 style={h6BlogStyle}>{blogpostJsx}</h6>
      </div>
    )
  }
}
export default withRouter(AllBlogPost)
