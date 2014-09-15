/** @jsx React.DOM */

var React = require('react')
var addons = require('react-addons')

var FormGroup = React.createClass({
  getDefaultProps: function() {
    return { error: null }
  },

  render: function() {
    var classes = addons.classSet({
      'form-group': true,
      'has-error': this.props.error,
      'has-feedback': this.props.error
    })
    return (
      <div className={classes}>
        {this.props.children}
        {this.props.error ? this.errorGlyph() : null}
        {this.props.error ? this.errorMessage() : null}
      </div>
    )
  },

  errorGlyph: function() {
    return <span className="glyphicon glyphicon-remove form-control-feedback"></span>
  },

  errorMessage: function() {
    return <span className="help-block">{this.props.error}</span>
  }
})

module.exports = FormGroup
