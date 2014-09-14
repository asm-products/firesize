/** @jsx React.DOM */

var React = require('react');
var Examples = require('./examples.jsx')

React.renderComponent(
  <div>
    <div className="jumbotron">
      <div className="container">
        <h1>Firesize</h1>
      </div>
    </div>
    <Examples />
  </div>,
  document.body);
