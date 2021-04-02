import React, { Component, Fragment } from 'react'
import { commentView } from '../../api/comments'
import { withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const commentsStyle = {
  textAlign: 'right',
  fontSize: '20px',
  color: 'black',
  fontFamily: 'New Tegomin'
}

class CommentsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: [],
      username: []
    }
  }
  componentDidMount () {
    const { match } = this.props
    commentView(match.params.id)
      .then(res => this.setState({ comment: res.data.comments.map(comments => comments.reply), username: res.data.comments.map(replies => replies.username) }))
  }
  render () {
    const { comment, username } = this.state
    const usernameJsx = username.map(username => (
      <Fragment key={uuidv4()}>
        <Fragment>
          <h2>{username}</h2>
        </Fragment>
      </Fragment>
    ))
    const commentJsx = comment.map(comment => (
      <div className="card" key={uuidv4()}>
        <div className="card-body">
          <h4 className="card-body">{comment}</h4>
        </div>
      </div>
    ))
    return (
      <div className="row" style={commentsStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {usernameJsx}
          {commentJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(CommentsView)
