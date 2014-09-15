/** @jsx React.DOM */

var React = require('react')
var Dashboard = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  componentWillMount: function() {
    document.title = 'Dashboard'
  },


  render: function() {
    return (
      <p>Show usage details. Images processed, cache hits/misses, etc</p>
    )
  }
})

module.exports = Dashboard
