/** @jsx React.DOM */

var React = require('react');
var Examples = require('./examples.jsx')
var IntroBlock = require('./intro.jsx');

//LESS
require('stylesheets/components/home.less');


var Home = React.createClass({
  componentWillMount: function() {
    document.title = 'Home'
  },

  render: function() {
    return <div>
    	<Examples />
    	<div className="fs-home"></div>
    	<IntroBlock />
    </div>
  }
})

module.exports = Home
