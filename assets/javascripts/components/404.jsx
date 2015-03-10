/** @jsx React.DOM */

var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="mx-auto col-10 bg-white shadow mt3" style={{ maxWidth: '800px' }}>
        <p className="center p2">Oops! There's nothing here...</p>
      </div>
    );
  }
});

module.exports = NotFound;
