/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Navbar = require('./navbar.jsx');

var WebsiteHandler = React.createClass({

  navbarLinks: function() {
    return (
      <a href="https://addons.heroku.com/firesize" className="red-dark">
        <span className="sm-hide">Install</span>
        <span className="sm-show">Install the Heroku add-on</span>
      </a>
    );
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
