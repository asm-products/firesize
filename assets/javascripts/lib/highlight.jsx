/** @jsx React.DOM */

var React = require('react');

var highlight = require('highlight.js');

var Highlight = React.createClass({
  render: function() {
    return <div dangerouslySetInnerHTML={{ __html: highlight.highlightAuto(this.props.children).value }} />;
  }
})

module.exports = Highlight;
