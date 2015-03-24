/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var auth = require('../lib/auth');

var Signup = React.createClass({
  mixins: [require('../lib/unauthenticated_route')],

  getInitialState: function() {
    return {
      error: false
    }
  },

  render: function() {
    var error;

    if (this.state.error) {
      error = (
        <div className="bold center p2 mb2 white bg-red rounded">
          Oops. Something went wrong.
        </div>
      );
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="col sm-col-6 auth-form shadow-1">
          <h2>Sign up</h2>

          <fieldset className="fieldset-reset">
            {error}

            <div className="mb2">
              <input type="email" name="email" ref="email" className="block full-width field-light" placeholder="Your email" autofocus/>
            </div>

            <div className="mb2">
              <input type="password" name="password" ref="password" className="block full-width field-light" placeholder="A super secret password" />
            </div>

            <button className="button button-big regular full-width" type="submit">Sign up</button>
          </fieldset>
        </form>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault()
    var email = this.refs.email.getDOMNode().value.trim()
    var password = this.refs.password.getDOMNode().value.trim()

    auth.signup(email, password, function(error) {
      console.log(error);

      if (error) {
        return this.setState({ error: true })
      }

      if (Signup.attemptedTransition) {
        var transition = Signup.attemptedTransition
        Signup.attemptedTransition = null
        transition.retry()
      } else {
        window.location.href = "/dashboard";
      }
    }.bind(this))
  }
})

module.exports = Signup;
