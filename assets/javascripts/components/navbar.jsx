/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router');
var Link = Router.Link;

var FiresizeLogo = require('../../images/logo.png');

require('stylesheets/app.scss');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="bg-red">
        <div className="container clearfix p2">
          <Link to="home" className="left red-dark">
            <img src={FiresizeLogo} height="30" width="30" className="mr1" />
            <span style={{ verticalAlign: 'top', height: '30px' }}>FireSize</span>
          </Link>
          <div className="right">
            <Link to="dashboard" className="red-dark ml3">Dashboard</Link>
            <Link to="docs" className="red-dark ml3">Docs</Link>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Navbar;
