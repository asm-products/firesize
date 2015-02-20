var request = require('superagent')
var url = require('url')

var auth = {
  signin: function(email, password, cb) {
    if (sessionStorage.token) {
      cb && cb(true)
      this.onChange(true)
      return
    }
    if (arguments.length === 0) {
      return
    }
    request
      .post('/api/sessions')
      .send({ email: email, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (error === null && res.ok) {
          cb && cb(true)
          this.onChange(true)
          sessionStorage.token = JSON.parse(res.text).token
        } else {
          cb && cb(false)
          this.onChange(false)
        }
      }.bind(this))
  },

  signup: function(email, password, cb) {
    if (sessionStorage.token) {
      cb && cb(true)
      this.onChange(true)
      return
    }
    if (arguments.length === 0) {
      return
    }
    request
      .post('/api/registrations')
      .send({ email: email, password: password })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (error === null && res.ok) {
          cb && cb(true)
          this.onChange(true)
          sessionStorage.token = JSON.parse(res.text).token
        } else {
          cb && cb(false)
          this.onChange(false)
        }
      }.bind(this))
  },

  getToken: function() {
    return sessionStorage.token
  },

  signout: function(cb) {
    delete sessionStorage.token
    cb && cb()
    this.onChange(false)
  },

  signedIn: function() {
    var currentUrl = url.parse(window.location.href, true)
    var token = currentUrl.query.token

    if(token) {
      sessionStorage.token = token

      currentUrl.search = currentUrl.query = null
      window.location = url.format(currentUrl)
    }

    return !!sessionStorage.token
  },

  onChange: function() {}
}

module.exports = auth
