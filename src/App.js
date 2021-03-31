import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// IMPORT BLOGPOST CRUD COMPONENTS
import BlogPostIndex from './components/BlogPostRoutes/IndexBlogPost'
import BlogPostCreate from './components/BlogPostRoutes/CreateBlogPost'
import BlogPostShow from './components/BlogPostRoutes/ShowBlogPost'
import BlogPostUpdate from './components/BlogPostRoutes/UpdateBlogPost'
import AllBlogPost from './components/BlogPostRoutes/allBlogPost'
import './index.scss'

// COMMENT COMPONENTS
import CommentCreate from './components/CommentRoutes/CreateComment'
import CommentsView from './components/CommentRoutes/ViewComments'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          {/* AuthenticatedRoute For Blog Posts */}
          <AuthenticatedRoute user={user} exact path='/blogposts-create' render={() => (
            <BlogPostCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' render={() => (
            <div className="jumbotron">
              <h1 className="display-4">Hello, World!</h1>
              <p className="lead">We would like to welcome you to the most sensational way to express yourself.</p>
              <hr className="my-4"/>
              <p>Are you ready to BANG IT OUT?</p>
              <p className="lead">
                <button><Link to={'/blogposts'}>View all Bangers</Link></button>
              </p>
            </div>
          )}/>
          <Route exact path='/' render={() => (
            <BlogPostIndex msgAlert={this.msgAlert} />
          )}/>
          <Route user={user} exact path='/blogposts' render={() => (
            <AllBlogPost user={user} msgAlert={this.msgAlert} />
          )}/>
          <Route user={user} path= '/blogposts/:id' render={() => (
            <BlogPostShow user={user} msgAlert={this.msgAlert} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/blogposts/:id/edit' render={() => (
            <BlogPostUpdate msgAlert={this.msgAlert} user={user} />
          )}/>
          {/* COMMENT ROUTES */}
          <AuthenticatedRoute user={user} path='/blogposts/:id/comments' render={() => (
            <CommentCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/blogposts/:id/viewcomments' render={() => (
            <CommentsView msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <div className="jumbotron jumbotron-fluid fixed-bottom footer-group mt-5">
          <div className="container-fluid">
            <p>Copyright &copy; 2021 - by <a href="https://github.com/Team-Bang" className="button gitRepo" data-abc="true">Team Bang</a></p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
