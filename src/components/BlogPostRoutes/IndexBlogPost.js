import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { blogPostIndex } from '../../api/blogposts'
import Spinner from 'react-bootstrap/Spinner'
import { Container, Row, Col } from 'react-grid-system'

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
          <p className="card-text"><small className="text-muted"><td input type={Date}>{blogpost.date.substring(5, 10)}-{blogpost.date.substring(0, 4)}</td></small></p>
        </div>
      </div>
    ))
    function change () {
      for (let i = 0; i < 3; i++) {
        return blogpostJsx
      }
    }
    return (
      <div>
        <Container>
          <Row>
            <Col sm={4}>
      One of three columns
              <h3>{change()}</h3>
            </Col>
            <Col sm={4}>
      One of three columns
              <h3>{blogpostJsx}</h3>
            </Col>
            <Col sm={4}>
      One of three columns
              <h3>{blogpostJsx}</h3>
            </Col>
          </Row>
        </Container>
        <h3>Blog</h3>
        <h3>{blogpostJsx}</h3>
      </div>
    )
  }
}
export default withRouter(BlogPostIndex)
