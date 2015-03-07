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
        <div className="clearfix p2">
          <a href="#" className="left red-dark">
            Logo Firesize
          </a>
          <a href="https://addons.heroku.com/firesize" className="right red-dark">
            <span className="sm-hide">Install</span>
            <span className="sm-show">Install the Heroku add-on</span>
          </a>
        </div>

        <div className="col-10 mx-auto">
          <div className="center" style={{ paddingTop: '3rem', paddingBottom: '12rem' }}>
            <h1 className="white text-shadow">On the fly image resizing</h1>
            <h3 className="red-dark">No code required. Built-in CDN.</h3>
          </div>
        </div>
      </div>
    )
  },

  example: function() {
    return (
      <div className="clearfix" style={{ marginTop: '-10rem' }}>
        <div className="col-10 mx-auto" style={{ maxWidth: '750px' }}>
          <div className="px3 shadow-2 bg-white">
            <div className="py1 border-bottom" style={{ paddingTop: '1.5rem', borderWidth: '3px' }}>
              <p className="gray h6">
                <span style={{ padding: '0.25rem' }}>firesize.com/</span>
                <span className="black border shadow" style={{ padding: '0.25rem 0.5rem' }}>500x300</span>
                <span className="p1">/</span>
                <span className="black border shadow" style={{ padding: '0.25rem 0.5rem' }}>http://imgur.com/afjh39j.png</span>
              </p>
            </div>
            <div className="py2" style={{ paddingBottom: '2rem' }}>
              <img src="http://firesize.com/720x480/g_center/https://unsplash.imgix.net/photo-1417436026361-a033044d901f?fit=crop&fm=jpg&h=480&q=75&w=720" />
            </div>
          </div>
        </div>
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
