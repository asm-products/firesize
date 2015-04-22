/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Navbar = require('./navbar.jsx');

var WebsiteHandler = React.createClass({

  navbarLinks: function() {
    return [
      <a href="https://addons.heroku.com/firesize" className="red-dark">Install the Heroku add-on</a>,
      <Link to="signup" className="button ml3">Sign up</Link>,
      <Link to="signin" className="red-dark ml3">Sign in</Link>,
    ];
  },

  render: function() {
    var callout

    if (window.location.pathname == "/") {
      callout = (
        <div className="bg-white shadow-inset">
          <div className="container p3">
            <div className="h3 mb1">D'oh. We messed up. We had a great launch, but we learned one important lesson.</div>
            <span style={{ backgroundColor: '#FFF19B' }}>So we fixed it with a v2!</span> <a href="https://medium.com/@vanstee/and-that-s-why-you-should-always-ask-for-an-email-address-6a2deecd2d46" className="mb0">Read more about what went wrong, and how we solved the problem on our blog.</a>
          </div>
        </div>
      )
    }

    return (
      <div>
        {callout}
        <Navbar links={this.navbarLinks()} />
        <RouteHandler />
      </div>
    );
  },

});

module.exports = WebsiteHandler;
