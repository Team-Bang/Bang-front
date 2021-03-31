import React, { Component } from 'react'
import { commentView } from '../../api/comments'
import { withRouter } from 'react-router-dom'

const showBangersStyle = {
  textAlign: 'center',
  // fontFamily: 'Cormorant Garamond',
  // color: '$blogFont',
  fontSize: '20px',
  textShadow: '1px 1px 1px #000000',
  color: 'white'
}

class CommentsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: null
    }
  }
  componentDidMount () {
    const { match } = this.props
    commentView(match.params.id)
      .then(res => this.setState({ comment: res.data.comments.map(comments => comments.reply) }))
  }
  render () {
    const { comment } = this.state
    console.log('this is comment ' + comment)
    const commentJsx = (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{comment}</h4>
        </div>
      </div>
    )
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
