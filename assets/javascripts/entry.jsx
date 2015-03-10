/** @jsx React.DOM */

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

React.renderComponent((
  <Routes location="history">
    <Route handler={require('./components/website-handler.jsx')}>
      <DefaultRoute name="home" handler={require('./components/home.jsx')} />
    </Route>
    <Route handler={require('./components/app-handler.jsx')}>
      <NotFoundRoute name="notfound" path="404" handler={require('./components/404.jsx')} />
      <Route name="dashboard" handler={require('./components/dashboard.jsx')} />
      <Route name="docs" handler={require('./components/documentation.jsx')} />
    </Route>
  </Routes>
), document.body);
