/** @jsx React.DOM */

var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <div className="fs-footer container">
        <h3 className="fs-footer-title">Made with 100% pure Open Source Code</h3>
        <div className="fs-footer-content">
          Firesize is built on <a href="https://assembly.com/firesize">Assembly</a>
          as an open and collaborative effort. All profits are distributed back
          to the makers. Come and help us make Firesize even better!
        </div>
      </div>
    );
  }
});

module.exports = Footer;
