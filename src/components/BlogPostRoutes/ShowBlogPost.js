import React, { Component } from 'react'
import { blogPostShow } from '../../api/blogposts'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class ShowBlogPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      blogpost: null
    }
  }
  componentDidMount () {
    const { msgAlert, match } = this.props
    blogPostShow(match.params.id)
      .then(res => this.setState({ blogpost: res.data.blogpost }))
      .then(() => msgAlert({
        heading: 'Loaded Blog Successfully',
        message: 'Viewing blog',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load blog',
          message: 'Could not load blog with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { blogpost } = this.state
    let blogpostJsx = ''

    if (!blogpost) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
      blogpostJsx = (
        <div>
          <h4>{blogpost.title}</h4>
          <p>{blogpost.body}</p>
          <p>Written by: {blogpost.author}</p>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Post</h3>
          <p>{blogpostJsx}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(ShowBlogPost)
