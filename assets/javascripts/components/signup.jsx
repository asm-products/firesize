/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var auth = require('../lib/auth')

var Signup = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <form>
          <h2>Sign up</h2>

          <div className="form-group">
            <input type="email" name="" value="" className="form-control" placeholder="Your email" required autofocus/>
            <span className="error"></span>
          </div>

          <div className="form-group">
            <input type="email" name="" value="" className="form-control" placeholder="Re-enter Email" required/>
            <span className="error"></span>
          </div>

          <div className="form-group">
            <input type="password" name="" value="" className="form-control" placeholder="New Password" required/>
            <span className="error"></span>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  }
})

module.exports = Signup
