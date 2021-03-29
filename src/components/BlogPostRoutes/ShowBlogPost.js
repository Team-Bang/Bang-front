import React, { Component } from 'react'
import { blogPostShow, blogPostDelete } from '../../api/blogposts'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const showBangersStyle = {
  textAlign: 'center',
  fontFamily: 'Cormorant Garamond',
  color: '$blogFont',
  fontSize: '20px'
}

class ShowBlogPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogpost: null,
      deleted: false
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
  deleteBlogPost = () => {
    const { msgAlert, user, match } = this.props
    blogPostDelete(match.params.id, user)
      .then(res => {
        this.setState({ deleted: true })
      })
      .then(() => msgAlert({
        heading: 'Deleted Blog Successfully',
        message: 'Blog Deleted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete blog',
          message: 'Could not delete blog with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { user } = this.props
    const { blogpost, deleted } = this.state
    // console.log('This is user: ', user)
    let blogpostJsx = ''
    if (deleted) {
      return <Redirect to='/'/>
    }
    if (!blogpost) {
      return (
        <Spinner variant='primary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (!user) {
      blogpostJsx = (
        <div>
          <h3>{blogpost.title}</h3>
          <p>Written by: {blogpost.authorName}</p>
          <p>Written id: {blogpost.author}</p>
          <p>{blogpost.body}</p>
        </div>
      )
    } else if (user && user._id !== blogpost.author) {
      blogpostJsx = (
        <div>
          <h3>{blogpost.title}</h3>
          <p>Written by: {blogpost.authorName}</p>
          <p>Written id: {blogpost.author}</p>
          <p>{blogpost.body}</p>
        </div>
      )
    } else if (user && user._id === blogpost.author) {
      blogpostJsx = (
        <div>
          <h3>{blogpost.title}</h3>
          <p>Written by: {blogpost.authorName}</p>
          <p>Written id: {blogpost.author}</p>
          <p>{blogpost.body}</p>
          <button onClick={this.deleteBlogPost}><Link to={'/'}>Delete</Link></button>
          <button><Link to={'/blogposts/' + this.props.match.params.id + '/edit/'}>Update Post</Link></button>
        </div>
      )
    }
    return (
      <div className="row" style={showBangersStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {blogpostJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(ShowBlogPost)
