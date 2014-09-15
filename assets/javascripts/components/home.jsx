/** @jsx React.DOM */

var React = require('react');
var Examples = require('./examples.jsx')

var Home = React.createClass({
  componentWillMount: function() {
    document.title = 'Home'
  },

  render: function() {
    return <Examples />
  }
})

module.exports = Home
