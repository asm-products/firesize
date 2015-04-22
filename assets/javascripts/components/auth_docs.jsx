/** @jsx React.DOM */

var React = require('react');

var DocsMixin = require('./docs_mixin.jsx');
var AuthenticatedRoute = require('../lib/authenticated_route');

var AuthDocs = React.createClass({
  mixins: [DocsMixin, AuthenticatedRoute]
});

module.exports = AuthDocs;
