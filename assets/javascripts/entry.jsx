/** @jsx React.DOM */

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var AppHandler = require('./components/app-handler.jsx');
var WebsiteHandler = require('./components/website-handler.jsx');

var routes = [
  <Route handler={WebsiteHandler}>
    <DefaultRoute name="home" handler={require('./components/home.jsx')} />
    <Route name="signup" handler={require('./components/signup.jsx')} />
    <Route name="signin" handler={require('./components/signin.jsx')} />
    <Route name="docs" handler={require('./components/docs.jsx')} />
  </Route>,
  <Route handler={AppHandler}>
    <Route name="dashboard" handler={require('./components/dashboard.jsx')} />
    <Route name="authdocs" handler={require('./components/auth_docs.jsx')} />
    <Route name="signout" handler={require('./components/signout.jsx')} />
    <NotFoundRoute name="notfound" handler={require('./components/404.jsx')} />
  </Route>
];

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
