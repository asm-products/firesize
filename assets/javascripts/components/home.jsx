/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var Examples = require('./examples.jsx')
var Footer = require('./footer.jsx');
var IntroBlock = require('./intro.jsx');

require('stylesheets/app.scss');

var Home = React.createClass({
  componentWillMount: function() {
    document.title = 'Home'
  },

  render: function() {
    var header = this.header()
    var example = this.example()
    var body = this.body()
    var footer = this.footer()

    return (
      <div>
        {header}
        {example}
        {body}
        {footer}
      </div>
    )
  },

  header: function() {
    return (
      <div className="bg-red">
        <div>
          <div>Logo Firesize</div>
          <a href="https://addons.heroku.com/firesize">Install the Heroku add-on</a>
        </div>
        <div className="center py4">
          <h1 className="white shadow">On the fly image resizing</h1>
          <h3 className="red-dark">No code required. Built-in CDN.</h3>
        </div>
      </div>
    )
  },

  example: function() {
    return (
      <div className="p3 shadow bg-white">
        <Examples />        
      </div>
    )
  },

  body: function() {
    return (
      <div>
      </div>
    )
  },

  footer: function() {
    return (
      <div>
      </div>
    )
  }
})

module.exports = Home
