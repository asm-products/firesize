/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var FiresizeLogo = require('../../images/logo.png');

require('stylesheets/app.scss');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="bg-red">
        <div className="container clearfix p2">

          <Link to="home" className="left red-dark block homepage-logo">
            <img src={FiresizeLogo} height="30" width="30" className="mr1" />
            <span>Firesize</span>
          </Link>

          <div className="right">
            {this.props.links}
          </div>

        </div>
      </div>
    )
  }
});

module.exports = Navbar;
