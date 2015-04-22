var auth = require('./auth');

var UnauthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (auth.signedIn()) {
        auth.setTransition(transition);
        transition.redirect('/dashboard');
      }
    }
  }
};

module.exports = UnauthenticatedRoute;
