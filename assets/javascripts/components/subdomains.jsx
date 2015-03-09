/** @jsx React.DOM */

var React = require('react')
var Subdomains = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  render: function() {
    return (
      <p>TODO: Show and edit registered subdomains</p>
    );
  }
})

module.exports = Subdomains;
