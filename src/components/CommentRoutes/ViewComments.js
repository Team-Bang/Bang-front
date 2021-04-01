import React, { Component } from 'react'
import { commentView } from '../../api/comments'
import { withRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const showBangersStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: 'black'
}

class CommentsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: []
    }
  }
  componentDidMount () {
    const { match } = this.props
    commentView(match.params.id)
      .then(res => this.setState({ comment: res.data.comments.map(comments => comments.reply) }))
  }
  render () {
    const { comment } = this.state
    console.log(comment)
    const commentJsx = comment.map(comment => (
      <div className="card" key={uuidv4()}>
        <div className="card-body" >
          <h4 className="card-title">{comment}</h4>
        </div>
      </div>
    ))
    return (
      <div className="row" style={showBangersStyle}>
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {commentJsx}
        </div>
      </div>
    )
  }
}
export default withRouter(CommentsView)
