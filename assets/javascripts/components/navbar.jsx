/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var FiresizeLogo = require('../../images/logo.png');

require('stylesheets/app.scss');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="bg-red">
        <div className="container clearfix p2">
          <a href="#" className="left red-dark">
            <img src={FiresizeLogo} height="30" width="30" className="mr1" />
            <span style={{ verticalAlign: 'top', height: '30px' }}>FireSize</span>
          </a>
          <div className="right">
            <a href="#" className="red-dark ml3">Dashboard</a>
            <a href="#" className="red-dark ml3">Documentation</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
