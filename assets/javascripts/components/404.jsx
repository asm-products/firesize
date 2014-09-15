/** @jsx React.DOM */

var React = require('react');
var Examples = require('./examples.jsx')

var NotFound = React.createClass({
  render: function() {
    return <p>There's nothing here...</p>
  }
})

module.exports = NotFound
