/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var Routes = Router.Routes
var DefaultRoute = Router.DefaultRoute
var Link = Router.Link

var App = require('./components/app.jsx')
var Home = require('./components/home.jsx')
var Signin = require('./components/signin.jsx')
var Signup = require('./components/signup.jsx')
var Signout = require('./components/signout.jsx')
var Dashboard = require('./components/dashboard.jsx')
var auth = require('./lib/auth')

React.renderComponent(
  <Routes location="history">
    <Route path="/" handler={App}>
      <DefaultRoute name="home" handler={Home} />
      <Route name="signin" handler={Signin} />
      <Route name="signup" handler={Signup} />
      <Route name="signout" handler={Signout} />
      <Route name="dashboard" handler={Dashboard} />
    </Route>
  </Routes>, document.body)
