/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var auth = require('../lib/auth');

var Signup = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign up</h2>

          <div className="form-group">
            <input type="email" name="email" ref="email" className="form-control" placeholder="Your email" required autofocus/>
            <span className="error"></span>
          </div>

          <div className="form-group">
            <input type="password" name="password" ref="password" className="form-control" placeholder="New password" required/>
            <span className="error"></span>
          </div>

          <div className="form-group">
            <input type="password" name="password_confirmation" ref="password_confirmation" className="form-control" placeholder="Re-enter password" required/>
            <span className="error"></span>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  },

  handleSubmit: function(e) {
    e.preventDefault()
    var email = this.refs.email.getDOMNode().value.trim()
    var password = this.refs.password.getDOMNode().value.trim()

    auth.signup(email, password, function(signedIn) {
      if (!signedIn) {
        return this.setState({ error: true })
      }

      if (Signup.attemptedTransition) {
        var transition = Signup.attemptedTransition
        Signup.attemptedTransition = null
        transition.retry()
      } else {
        Router.replaceWith('/dashboard')
      }
    }.bind(this))
  }
})

module.exports = Signup;
