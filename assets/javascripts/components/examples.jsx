/** @jsx React.DOM */

var React = require('react/addons');
var AdaptiveInput = require('./lib/input-adaptive.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var UtilsMixin = require('./mixins/utils.jsx');
var _ = require("underscore");

//LESS
require('stylesheets/components/examples.less');

var DEFAULT_IMAGE_GRAVITY = "g_west";
var gravityOtherOptions = ["g_center","g_north", "g_south", "g_east"];
var DEFAULT_IMAGE_URL = 'http://placekitten.com/g/900/600';
var DEFAULT_IMAGE_WIDTH = 400;
var DEFAULT_IMAGE_HEIGHT = 500
var VALIDATOR_NUMBER = /^[0-9]+$/;
var VALIDATOR_URL = /(http|https|ftp):\/\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$&\/\/=]*)?/gi;

var debounce = require('../lib/debounce')

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

    imageGravity: React.PropTypes.string

  },

  getDefaultProps: function() {

    return {
      imageUrl: DEFAULT_IMAGE_URL,
      imageWidth: 0,
      imageHeight: 0,
      imageGravity: DEFAULT_IMAGE_GRAVITY
    }
  }
};

var ExampleInput = React.createClass({

  displayName: "ExampleInput",

  PropTypes: {

    handleChange: React.PropTypes.func.isRequired

  },

  mixins: [ExampleMixin],

  /**
   * Handle the action when the Gravity button clicked
   * @return {[type]} [description]
   */
  _handleChangeForGravity: debounce(function() {
    
    var currentGravity = this.props.imageGravity;
    var newGravity = gravityOtherOptions.pop();
    gravityOtherOptions = [currentGravity].concat(gravityOtherOptions);

    this.props.handleChange({
      changeType: 'gravity',
      value: newGravity
    });

  }, 300),

  /**
   * Handle the action when the width of the image changes
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  _handleChangeForWidth: debounce(function(value) {
    if (value.match(VALIDATOR_NUMBER)) {
      var newWidth = parseInt(value ,10);
      this.props.handleChange({
        changeType: 'width',
        value: newWidth,
      });
    }
  }, 300),

  /**
   * Handle the action when the height of the image changes
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  _handleChangeForHeight: debounce(function(value) {
    if (value.match(VALIDATOR_NUMBER)) {
      var newHeight = parseInt(value ,10);
      this.props.handleChange({
        changeType: 'height',
        value: newHeight,
      });
    }
  }, 300),

  /**
   * Handle the action when the url of the image changes
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
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
    <span className="fs-examples-input-position" onClick={this._handleChangeForGravity}>{this.props.imageGravity}</span>
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
      this.props.imageGravity +
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
      imageWidth: DEFAULT_IMAGE_WIDTH,
      imageHeight: DEFAULT_IMAGE_HEIGHT,
      imageGravity: DEFAULT_IMAGE_GRAVITY
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
        imageGravity={this.state.imageGravity} handleChange={this._handleInputChange}/>
      <ExampleOutput imageWidth={this.state.imageWidth}
        imageHeight={this.state.imageHeight} imageUrl={this.state.imageUrl}
        imageGravity={this.state.imageGravity}/>
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
        case 'gravity':
          this.setState({
            imageGravity: value
          });
          break;

      }
    }
  }
})

module.exports = Examples
