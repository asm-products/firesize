/** @jsx React.DOM */

var React = require('react');

var Highlight = require('../lib/highlight.jsx');

var Navbar = require('./navbar.jsx');

var Documentation = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  componentWillMount: function() {
    document.title = 'Docs';
  },

  render: function() {
    return (
      <div>
        <Navbar />

        <div className="container py3">
          <div className="bg-white border p3">
            <h2 className="mt0">Getting Started</h2>
            <Highlight>
              {'for(var item in items) { console.log(item) }'}
            </Highlight>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Documentation;
