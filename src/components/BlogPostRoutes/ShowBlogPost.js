import React, { Component } from 'react'
import { blogPostShow, blogPostDelete } from '../../api/blogposts'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import CommentsView from '../CommentRoutes/ViewComments'

const showBangersStyle = {
  textAlign: 'center',
  // fontFamily: 'Cormorant Garamond',
  // color: '$blogFont',
  fontSize: '20px',
  textShadow: '1px 1px 1px #000000',
  color: 'white'
}

const borderParagraph = {
  fontSize: 'large'
}

class ShowBlogPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogpost: null,
      deleted: false,
      commentClicked: false
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

  toggleComments = (event) => {
    // this.setState is only possible because of extends Component
    // never override the value of state by hard coding it
    // always use setState()
    this.setState({ commentClicked: !this.state.commentClicked })
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
    // console.log('This is user: ' + user)
    console.log(blogpost)
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
          <h2>{blogpost.title}</h2>
          <p style={borderParagraph}>Written by: {blogpost.authorName}</p><hr/>
          <p>{blogpost.body}</p>
        </div>
      )
    } else if (user && user._id !== blogpost.author) {
      blogpostJsx = (
        <div>
          <h2>{blogpost.title}</h2>
          <p style={borderParagraph}>Written by: {blogpost.authorName}</p><hr/>
          <p>{blogpost.body}</p>
          <button><Link to={'/blogposts/' + this.props.match.params.id + '/comments/'}>Create Comment</Link></button>
        </div>
      )
    } else if (user && user._id === blogpost.author) {
      blogpostJsx = (
        <div>
          <h2>{blogpost.title}</h2>
          <p style={borderParagraph}>Written by: {blogpost.authorName}</p><hr/>
          <p>{blogpost.body}</p>
          <button onClick={this.deleteBlogPost}><Link to={'/'}>Delete</Link></button>
          <button><Link to={'/blogposts/' + this.props.match.params.id + '/edit/'}>Update Post</Link></button>
          <button><Link to={'/blogposts/' + this.props.match.params.id + '/comments'}>Create Comment</Link></button>
        </div>
      )
    }
    return (
      <div className="row" style={showBangersStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {blogpostJsx}
          <button onClick={this.toggleComments}>{this.state.commentClicked ? 'Close' : 'View Comments'}</button>
          {this.state.commentClicked ? <CommentsView /> : ''}
        </div>
      </div>
    )
  }
}
export default withRouter(ShowBlogPost)
