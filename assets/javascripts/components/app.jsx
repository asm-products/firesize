/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Link = Router.Link

var auth = require('../lib/auth')

var SignedIn = require('./signed_in.jsx')

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
    var layout
    if (this.state.signedIn) {
      layout = <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <ul className="nav nav-sidebar">
                <li><Link to="dashboard">Dashboard</Link></li>
                <li><Link to="subdomains">Subdomains</Link></li>
              </ul>
            </div>
            <div className="col-md-10">
              {this.props.activeRouteHandler()}
            </div>
          </div>
        </div>
      </div>
    } else {
      layout = this.props.activeRouteHandler()
    }

    return <div>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">Firesize</Link>
          </div>

          {this.signInOutLinks()}
        </div>
      </nav>

      {layout}
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
