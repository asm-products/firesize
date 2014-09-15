/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var auth = require('../lib/auth')

var Dashboard = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  render: function() {
    var token = auth.getToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

module.exports = Dashboard
