import React, { Component } from 'react'
import CommentForm from '../CommentForm/CommentForm'
import { commentCreate } from '../../api/comments'
import { withRouter, Redirect } from 'react-router-dom'

class CommentCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        reply: ''
      },
      created: false
    }
  }
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        comment: { ...state.comment, [event.target.name]: event.target.value }
      }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { comment } = this.state
    console.log(`this is user ${user}, this is id ${match.params.id}, this is comment ${comment}`)
    commentCreate(comment, user, match.params.id)
      .then(res => this.setState({ created: true }))
      .then(() => msgAlert({
        heading: 'Created comment Successfully',
        message: 'Showing created comment',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create comment',
          message: 'Could not create comment with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { comment, created } = this.state
    const { match } = this.props
    if (created) {
      return <Redirect to={'/blogposts/' + match.params.id} />
    }
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create comment</h3>
          <CommentForm
            comment={comment}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(CommentCreate)
