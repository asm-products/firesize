/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Link = Router.Link

//LESS
require('stylesheets/components/header.less')

var auth = require('../lib/auth')

var SignedIn = require('./signed_in.jsx')

var App = React.createClass({
  getInitialState: function() {
    return {
      signedIn: auth.signedIn(),
      isExpanded: false,
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
    } else {
      layout = this.props.activeRouteHandler()
    }

    return <div>
      {this.navBarTop()}
      <div className="fs-app-container" >
        {layout}
      </div>
    </div>
  },

  navBarTop: function() {
    return (
      <Navbar className="fs-header">
        <header className=" navbar-static-top " >
          <div className="fs-header-container container">
            <div className="navbar-header">
              <Link to="home" className="fs-header-brand navbar-brand"></Link>
              <button className="fs-header-toggle navbar-toggle" type="button" onClick={this.onNavBtnOnClick}>
                <span className="sr-only">Toggle Nav</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            {this.signInOutLinks()}
          </div>
        </header>
      </Navbar>
    );
  },

  signInOutLinks: function() {
    
    if (this.state.signedIn) {          

    return <Nav navbar={true} collapsable={true} pullRight={this.state.isPullRight} 
              className="fs-navbar-collapse" role="navigation" id="top" bsClass="nav"
                expanded={this.state.isExpanded}>
      <li><Link to="usage">Usage</Link></li>
      <li><Link to="pricing">Pricing</Link></li>
      <li><Link to="signout">Sign Out</Link></li>
     
    </Nav>
    } else {
      return <Nav navbar={true} collapsable={true} pullRight={true} 
              className="fs-navbar-collapse" role="navigation" id="top" bsClass="nav"
                expanded={this.state.isExpanded}>
        <li><Link to="usage">Usage</Link></li>
        <li><Link to="pricing">Pricing</Link></li>
        <li><Link to="signin">Log In</Link></li>
        <li className="fs-header-signup"><Link to="signup">Sign Up</Link></li>
      </Nav>
    }
},

  onNavBtnOnClick: function() {
    var currentIsExpanded = this.state.isExpanded;
    var currentIsPullRight = this.state.isPullRight;
    this.setState({
      isExpanded: !currentIsExpanded,
    });
  }
})

module.exports = App
