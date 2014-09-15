/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var auth = require('../lib/auth')

var Signin = React.createClass({
  statics: {
    attemptedTransition: null
  },

  getInitialState: function() {
    return {
      error: false
    }
  },
  render: function() {
    return <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign in</h2>

          <div className="form-group">
            <input type="email" ref="email" className="form-control" placeholder="Your email" required autofocus />
          </div>
          <div className="form-group">
            <input type="password" ref="password" className="form-control" placeholder="Password" required />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  },

  handleSubmit: function(e) {
    e.preventDefault()
    var email = this.refs.email.getDOMNode().value.trim()
    var password = this.refs.password.getDOMNode().value.trim()

    auth.signin(email, password, function(signedIn) {
      if (!signedIn) {
        return this.setState({ error: true })
      }

      if (Signin.attemptedTransition) {
        var transition = Signin.attemptedTransition
        Signin.attemptedTransition = null
        transition.retry()
      } else {
        Router.replaceWith('/dashboard')
      }
    }.bind(this))
  }
})

module.exports = Signin
