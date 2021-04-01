import React, { Component } from 'react'
import { commentView } from '../../api/comments'
import { withRouter } from 'react-router-dom'

const showBangersStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: 'black'
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
      .then(res => this.setState({ comment: res.data.comments.map(comments => JSON.stringify(comments.reply)) }))
  }
  // create jsx that loops over the returned arr of coments
  // forEa comment - create new comments component(commentComponent) for ea element
  render () {
    const { comment } = this.state
    console.log('this is comment ' + comment)
    console.log('this is stringyify comment ' + JSON.stringify(comment))
    // for (let i = 0; i < comment.length; i++) {
    //   const newJsx = comment[i]
    //   console.log(newJsx)
    // }
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
