/** @jsx React.DOM */

var React = require('react');

var DocsMixin = require('./docs_mixin.jsx');

var Docs = React.createClass({
  mixins: [DocsMixin]
});

module.exports = Docs;
