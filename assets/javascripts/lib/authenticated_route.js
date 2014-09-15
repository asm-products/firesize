var auth = require('../lib/auth')

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.signedIn()) {
        Signin.attemptedTransition = transition
        transition.redirect('/signin')
      }
    }
  }
};

module.exports = AuthenticatedRoute
