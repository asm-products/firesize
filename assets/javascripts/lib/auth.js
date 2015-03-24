var url = require('url');
var request = require('superagent');

var internals = {};

internals.signin = function(email, password, callback) {
  // Extracted done cause we call two things all the time
  var done = function(err) {
    if (callback) callback(err);
    this.onChange(!err);
  }.bind(this);

  if (sessionStorage && sessionStorage.getItem('token')) {
    return done();
  }

  if (!email || email === '' || !password || password === '') {
    return done(new Error('Email and Password are required for signing in'));
  }

  request
    .post('/api/sessions')
    .send({ email: email, password: password })
    .set('Accept', 'application/json')
    .end(function(error, res) {
      if (error === null && res.ok) {
        if (sessionStorage) {
          sessionStorage.setItem('token', JSON.parse(res.text).token);
        }
        done();
      } else {
        done(new Error('Bad response from api'));
      }
    })
};

internals.signup = function(email, password, callback) {
  // Extracted done cause we call two things all the time
  var done = function(err) {
    if (callback) callback(err);
    this.onChange(!err);
  }.bind(this);

  if (sessionStorage && sessionStorage.getItem('token')) {
    return done();
  }

  if (!email || email === '' || !password || password === '') {
    return done(new Error('Email and Password are required for signing up'));
  }

  request
    .post('/api/registrations')
    .send({ email: email, password: password })
    .set('Accept', 'application/json')
    .end(function(error, res) {
      if (error === null && res.ok) {
        if (sessionStorage) {
          sessionStorage.setItem('token', JSON.parse(res.text).token);
        }
        done();
      } else {
        done(new Error('Bad response from api'));
      }
    }.bind(this))
};

internals.signout = function(cb) {
  if (sessionStorage) {
    sessionStorage.setItem('token', '');
  }
  if (callback) callback();
  this.onChange(false);
};

internals.getToken = function() {
  if (sessionStorage) {
    return sessionStorage.getItem('token');
  } else {
    return '';
  }
};

internals.signedIn = function() {
  var currentUrl = url.parse(window.location.href, true);
  var token = currentUrl.query.token;

  if (token) {
    if (sessionStorage) {
      sessionStorage.setItem('token', token);
    }

    currentUrl.search = null;
    currentUrl.query = null;
    window.location = url.format(currentUrl);
  }

  var token = sessionStorage.getItem('token')
  return token && token !== '';
};

internals.setTransition = function(transition) {
  internals.transition = transition;
};

internals.onChange = function() {};

module.exports = internals;
