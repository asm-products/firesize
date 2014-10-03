
/**
 * @jsx React.DOM
 */
/**
 * A responsive input
 * @author Hao Huang
 * @email haohcraft@gmail.com
 */

var React = require('react');

var DEFAULT_FONT_SIZE = 22;

//LESS
require('stylesheets/components/lib/adaptiveinput.less');
var AdaptiveInput = React.createClass({

	displayName: "AdaptiveInput",

	propTypes: {
		/**
		 * A value for the input
		 */
		value: React.PropTypes.string,
		/**
		 * The basic font-size
		 */
		fontSize: React.PropTypes.number,
		/**
		 * [handleChange description]
		 */
		handleChange: React.PropTypes.func

	},

	fontSize: 0,

	getInitialState: function() {
		this.fontSize = this.props.fontSize ? this.props.fontSize : DEFAULT_FONT_SIZE;
		// console.log("The value's length: ", this.props.value.length);
		return {
			width: (this.props.value.length + 1) * this.fontSize/2 ,
			value: this.props.value
		};
	},

	_handleChange: function(e) {

		var currentWidth = this.state.width;
		this.props.handleChange(e.target.value);
		this.setState({
			value: e.target.value,
			width: (e.target.value.length + 1) * this.fontSize/2
		});
	},

	render: function() {

		var style = {
			'font-size': this.fontSize,
			'width': this.state.width,
		};

		return <input className="AdaptiveInput" type="text" value={this.state.value} style={style} onChange={this._handleChange} />;
	}

});

module.exports = AdaptiveInput;

