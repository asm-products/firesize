/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var auth = require('../lib/auth')

var FormGroup = require('./form_group.jsx')

var Signin = React.createClass({
  mixins: [require('../lib/unauthenticated_route')],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function() {
    return {
      error: false
    }
  },
  render: function() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="col sm-col-6">
          <h2>Sign in</h2>

          <fieldset className="fieldset-reset">
            <div className="mb2">
              <input type="email" ref="email" className="block full-width field-light" placeholder="Your email" autofocus />
            </div>

            <div className="mb2">
              <input type="password" ref="password" className="block full-width field-light" placeholder="Password" />
            </div>

            <button className="button" type="submit">Sign in</button>
          </fieldset>
        </form>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault()
    var email = this.refs.email.getDOMNode().value.trim()
    var password = this.refs.password.getDOMNode().value.trim()

    auth.signin(email, password, function(error) {
      if (error) {
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
