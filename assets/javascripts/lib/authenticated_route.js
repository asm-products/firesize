var auth = require('./auth');

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.signedIn()) {
        auth.setTransition(transition);
        transition.redirect('/signin');
      }
    }
  }
};

module.exports = AuthenticatedRoute;
