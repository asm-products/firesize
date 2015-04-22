/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var auth = require('../lib/auth');

var Signout = React.createClass({
  render: function() {
    auth.signout(function() {
      window.location.href = "/";
    });

    return <div />;
  }
});

module.exports = Signout;
