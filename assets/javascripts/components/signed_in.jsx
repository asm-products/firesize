/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SignedIn = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <ul className="nav nav-sidebar">
              <li><Link to="dashboard">Dashboard</Link></li>
              <li><Link to="subdomains">Subdomains</Link></li>
            </ul>
          </div>
          <div className="col-md-10">
            {this.props.activeRouteHandler()}
          </div>
        </div>
      </div>
    );
  }
})

module.exports = SignedIn;
