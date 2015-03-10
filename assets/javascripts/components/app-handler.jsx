/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Navbar = require('./navbar.jsx');

var AppHandler = React.createClass({

  navbarLinks: function() {
    return [
      <Link to="dashboard" className="red-dark ml3">Dashboard</Link>,
      <Link to="docs" className="red-dark ml3">Docs</Link>
    ];
  },

  render: function() {
    return (
      <div>
        <Navbar links={this.navbarLinks()} />
        {this.props.activeRouteHandler()}
      </div>
    );
  },

});

module.exports = AppHandler;
