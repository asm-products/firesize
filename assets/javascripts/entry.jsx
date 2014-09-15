/** @jsx React.DOM */

var React = require('react')

var Router = require('react-router')
var Route = Router.Route
var Routes = Router.Routes
var DefaultRoute = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

React.renderComponent(
  <Routes location="history">
    <Route handler={require('./components/app.jsx')}>
      <DefaultRoute name="home" handler={require('./components/home.jsx')} />
      <NotFoundRoute name="notfound" path="404" handler={require('./components/404.jsx')} />

      <Route name="signin" handler={require('./components/signin.jsx')} />
      <Route name="signup" handler={require('./components/signup.jsx')} />
      <Route name="signout" handler={require('./components/signout.jsx')} />

      <Route name="dashboard" handler={require('./components/dashboard.jsx')} />
      <Route name="subdomains" handler={require('./components/subdomains.jsx')} />
    </Route>
  </Routes>, document.body)
