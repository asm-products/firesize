/** @jsx React.DOM */

var React = require('react');
var Examples = require('./examples.jsx')

var Home = React.createClass({
  render: function() {
    return <Examples />
  }
})

module.exports = Home
