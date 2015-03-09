/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var auth = require('../lib/auth');

var Signout = React.createClass({
  componentDidMount: function() {
    auth.signout();
  },

  render: function() {
    return <p>You are now signed out</p>;
  }
})

module.exports = Signout;
