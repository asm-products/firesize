/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Link = Router.Link

var auth = require('../lib/auth')

var App = React.createClass({
  getInitialState: function() {
    return {
      signedIn: auth.signedIn()
    }
  },

  setStateOnAuth: function(signedIn) {
    this.setState({
      signedIn: signedIn
    })
  },

  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth
    auth.signin()
  },

  render: function() {
    return <div>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">Firesize</Link>
          </div>

          {this.signInOutLinks()}
        </div>
      </nav>

      {this.props.activeRouteHandler()}
    </div>
  },

  signInOutLinks: function() {
    if (this.state.signedIn) {
      return <ul className="nav navbar-nav navbar-right">
        <li><Link to="signout">Sign Out</Link></li>
      </ul>
    } else {
      return <ul className="nav navbar-nav navbar-right">
        <li><Link to="signin">Sign In</Link></li>
        <li><Link to="signup">Sign Up</Link></li>
      </ul>
    }
  }
})

module.exports = App
