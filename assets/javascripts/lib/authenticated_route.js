var Signin = require('../components/signin.jsx')
var auth = require('./auth')

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
