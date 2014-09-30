/** @jsx React.DOM */

var React = require('react');

var DEFAULT_IMAGE_URL = 'http:/placekitten.com/g/1024/320';

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
    imageHeight: React.PropTypes.number
  },

  getDefaultProps: function() {

    return {
      imageUrl: "http:/placekitten.com/g/1024/320",
      imageWidth: 0,
      imageHeight: 0  
    }
  }
};

var ExampleInput = React.createClass({

  displayName: "ExampleInput",

  mixins: [ExampleMixin],

  render: function() {
    return  <div className="examples-input">
    <span className="examples-input-domain">{"http://firesize.com/"}</span>
    <span className="examples-input-width">{this.props.imageWidth}</span>
    <span>x</span>
    <span className="examples-input-height">{this.props.imageHeight}</span>
    <span>/g_center/</span>
    <span className="examples-input-url">/{this.props.imageUrl}</span>
  </div>
  }
 
});

var ExampleOutput = React.createClass({

  displayName: "ExampleOutput",

  mixins: [ExampleMixin],

  render: function() {
    var testImage = "/" + this.props.imageWidth + "x" + this.props.imageHeight + "/g_center/" + this.props.imageUrl;
    return <div className="examples-output">
      <img className="examples-output-image" src={testImage}></img>
    </div>
  }
});

var Examples = React.createClass({

  displayName: "Examples",


  getInitialState: function() {
    return {
      imageUrl: DEFAULT_IMAGE_URL,
      imageWidth: 100,
      imageHeight: 100
    }
  },

  render: function() {
    return <div className="examples container">
      <div className="slogan">aa</div>
      <ExampleInput imageUrl={this.state.imageUrl}/>
      <ExampleOutput imageWidth={this.state.imageWidth} 
        imageHeight={this.state.imageHeight} imageUrl={this.state.imageUrl}/>
    </div>
  }
})

module.exports = Examples
