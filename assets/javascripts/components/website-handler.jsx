/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Navbar = require('./navbar.jsx');

var WebsiteHandler = React.createClass({

  navbarLinks: function() {
    return [
      <a href="https://addons.heroku.com/firesize" className="red-dark">Install the Heroku add-on</a>,
      <Link to="signup" className="button ml3">Sign up</Link>,
      <Link to="signin" className="red-dark ml3">Sign in</Link>,
    ];
  },

  render: function() {
    return (
      <div>
        <Navbar links={this.navbarLinks()} />
        <RouteHandler />
      </div>
    );
  },

});

module.exports = WebsiteHandler;
