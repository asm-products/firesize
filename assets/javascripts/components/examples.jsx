/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react/addons');
var AdaptiveInput = require('./lib/input-adaptive.jsx');
var UtilsMixin = require('./mixins/utils.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DEFAULT_IMAGE_URL = 'http://placekitten.com/g/800/600';
var VALIDATOR_NUMBER = /^[0-9]+$/;
var VALIDATOR_URL = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;

var debounce = require('../lib/debounce');

var ExampleMixin = {

  propTypes: {
    /**
     * The URL of the test image
     * @type {[type]}
     */
    imageUrl: React.PropTypes.string,
    /**
     * The width of the test image
     * @type {[type]}
     */
    imageWidth: React.PropTypes.number,
    /**
     * The height of the test image
     * @type {[type]}
     */
    imageHeight: React.PropTypes.number,

    imagePosition: React.PropTypes.string

  },

  getDefaultProps: function() {

    return {
      imageUrl: DEFAULT_IMAGE_URL,
      imageWidth: 0,
      imageHeight: 0,
      imagePosition: ""
    }
  }
};

var ExampleInput = React.createClass({

  displayName: "ExampleInput",

  PropTypes: {

    handleChange: React.PropTypes.func.isRequired

  },

  mixins: [ExampleMixin],

  _handleChangeForWidth: debounce(function(value) {
    if (value.match(VALIDATOR_NUMBER)) {
      var newWidth = parseInt(value ,10);
      this.props.handleChange({
        changeType: 'width',
        value: newWidth,
      });
    }
  }, 300),

  _handleChangeForHeight: debounce(function(value) {
    if (value.match(VALIDATOR_NUMBER)) {
      var newHeight = parseInt(value ,10);
      this.props.handleChange({
        changeType: 'height',
        value: newHeight,
      });
    }
  }, 300),

  _handleChangeForUrl: function(value) {

    if (VALIDATOR_URL.test(value)) {
      this.props.handleChange({
        changeType: 'imageUrl',
        value: value,
      });
    }
  },

  componentDidMount: function() {
    this.refs.imageWidth.getDOMNode().focus();
  },

  render: function() {
    return  <div className="fs-examples-input">
    <span className="fs-examples-input-domain">https://firesize.com/</span>
    <AdaptiveInput ref="imageWidth" value={this.props.imageWidth.toString()} handleChange={this._handleChangeForWidth} />
    <span>x</span>
    <AdaptiveInput ref="imageHeight" value={this.props.imageHeight.toString()} handleChange={this._handleChangeForHeight} />
    <span>/</span>
    <span className="fs-examples-input-position">{this.props.imagePosition}</span>
    <span>/</span>
    <AdaptiveInput ref="imageUrl" value={this.props.imageUrl} handleChange={this._handleChangeForUrl} />

  </div>
  }

});

var ExampleOutput = React.createClass({

  displayName: "ExampleOutput",

  mixins: [ExampleMixin, UtilsMixin],

  render: function() {
    var testImage = "/" +
      this.props.imageWidth + "x" +
      this.props.imageHeight + "/" +
      this.props.imagePosition +
      this.props.imageUrl;

    var styleWrapper = {
      width: this.props.imageWidth,
      height: this.props.imageHeight
    };
    var styleImageBefore = {
      height: this.props.imageHeight
    };
    var styleImageAfter = {
      width: this.props.imageWidth,
      top: parseInt(this.props.imageHeight) + 10
    };
    var styleImage = {
      width: this.props.imageWidth,
      height: this.props.imageHeight
    };
    return <ReactCSSTransitionGroup transitionName="fs-examples-output-transition">
      <div className="fs-examples-output"  key={this.getRandomNum()}>
        <div className="fs-examples-output-wrapper" style={styleWrapper}>
          <div className="fs-examples-output-image-before" style={styleImageBefore}>
            <span className="fs-examples-output-image-before-height">{this.props.imageHeight}px</span>
          </div>
          <img className="fs-examples-output-image" src={testImage} style={styleImage}></img>
          <div className="fs-examples-output-image-after" style={styleImageAfter}>
            <span className="fs-examples-output-image-before-width">{this.props.imageWidth}px</span>
          </div>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  }
});

var Examples = React.createClass({

  displayName: "Examples",


  getInitialState: function() {
    return {
      imageUrl: DEFAULT_IMAGE_URL,
      imageWidth: 500,
      imageHeight: 300,
      imagePosition: "g_center"
    }
  },

  onClick: function() {
    var currentWidth = parseInt(this.state.imageWidth) - 5;
    var currentHeight = parseInt(this.state.imageHeight) - 15;
    this.setState({
      imageWidth: currentWidth,
      imageHeight: currentHeight
    });
  },

  render: function() {
    return <div className="fs-examples container">
      <div onClick={this.onClick} className="fs-examples-slogan">Image Resizing on the Fly</div>
      <ExampleInput  imageWidth={this.state.imageWidth}
        imageHeight={this.state.imageHeight} imageUrl={this.state.imageUrl}
        imagePosition={this.state.imagePosition} handleChange={this._handleInputChange}/>
      <ExampleOutput imageWidth={this.state.imageWidth}
        imageHeight={this.state.imageHeight} imageUrl={this.state.imageUrl}
        imagePosition={this.state.imagePosition}/>
    </div>
  },

  _handleInputChange: function(data) {

    if (data.hasOwnProperty('changeType') && data.hasOwnProperty('value')) {
      var value = data.value;
      switch (data.changeType) {
        case 'width':
          this.setState({
            imageWidth: value
          });
          break;
        case 'height':
          this.setState({
            imageHeight: value
          });
          break;
        case 'imageUrl':
          this.setState({
            imageUrl: value
          });
          break;
      }
    }
  }
})

module.exports = Examples
