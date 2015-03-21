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
        <span className="sm-hide">
          <span className="inline-block bold mr2 py1 px2 white bg-blue rounded h6">Free during Beta!</span>
          Install
        </span>
        <span className="sm-show">
          <span className="inline-block bold mr2 py1 px2 white bg-blue rounded h6">Free during Beta!</span>
          Install the Heroku add-on
        </span>
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
