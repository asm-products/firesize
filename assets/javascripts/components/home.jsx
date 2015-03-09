/** @jsx React.DOM */

var React = require('react')
var Router = require('react-router')

var FiresizeLogo = require('../../images/logo.png');

require('stylesheets/app.scss');

var Home = React.createClass({
  componentWillMount: function() {
    document.title = 'Firesize | Home';
  },

  getInitialState: function() {
    return {
      previewUrl: 'http://firesize.com/720x480/g_center/http://i.imgur.com/hHpJscb.png'
    };
  },

  updatePreview: function() {
    // Throttle onKeyUp event and update previewUrl
    // in state when we finally trigger
    if (this.handle) clearTimeout(this.handle);
    this.handle = setTimeout(function() {
      this.setState({
        previewUrl: [
          'http://firesize.com/',
          this.refs.width.getDOMNode().value,
          'x',
          this.refs.height.getDOMNode().value,
          '/g_center/',
          this.refs.url.getDOMNode().value
        ].join('')
      });

      this.handle = null;
    }.bind(this), 500);
  },

  render: function() {
    return (
      <div>
        {this.header()}
        {this.example()}
        {this.body()}
        {this.footer()}
      </div>
    )
  },

  header: function() {
    return (
      <div className="bg-red">
        <div className="clearfix p2">
          <a href="/" className="left red-dark block homepage-logo">
            <img src={FiresizeLogo} height="30" width="30" className="mr1" />
            <span>FireSize</span>
          </a>
          <a href="https://addons.heroku.com/firesize" className="right red-dark">
            <span className="sm-hide">Install</span>
            <span className="sm-show">Install the Heroku add-on</span>
          </a>
        </div>

        <div className="col-10 mx-auto">
          <div className="center" style={{ paddingTop: '3rem', paddingBottom: '13rem' }}>
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
            <div className="border-bottom" style={{ paddingTop: '1.5rem', borderWidth: '3px' }}>
              <p className="gray h6">

                <span className="p1">firesize.com/</span>
                <input ref="width"
                  className="homepage-preview-part black border shadow mb0"
                  onKeyUp={this.updatePreview}
                  style={{ width: '28px' }}
                  defaultValue="720" />
                <span className="p1">x</span>
                <input ref="height"
                  className="homepage-preview-part black border shadow mb0"
                  onKeyUp={this.updatePreview}
                  style={{ width: '28px' }}
                  defaultValue="480" />
                <span className="p1">/g_center/</span>
                <input ref="url"
                  className="homepage-preview-part black border shadow mb0"
                  onKeyUp={this.updatePreview}
                  style={{ width: '244px' }}
                  defaultValue="http://i.imgur.com/hHpJscb.png" />

              </p>
            </div>
            <div className="py2" style={{ paddingBottom: '2rem' }}>
              <img src={this.state.previewUrl} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  body: function() {
    return (
      <section className="homepage-feature-boxes">
        <div className="homepage-feature-box">
          <h1>Instant setup</h1>
          <p>
            Just include the firesize url and resize options as part of your
            image url and we'll resize your image and return it to you all on
            the fly. You wont need any background workers, thumbnail service or
            CDN configuration.
          </p>
        </div>
        <div className="homepage-feature-box">
          <h1>Pay-as-you-go</h1>
          <p>
            Just include the firesize url and resize options as part of your
            image url and we'll resize your image and return it to you all on
            the fly. You wont need any background workers, thumbnailURLs or
            CDN configuration.
          </p>
        </div>
      </section>
    )
  },

  footer: function() {
    return (
      <footer className="homepage-footer">
        Built by the community on <a href="https://assembly.com/firesize" target="_blank">Assembly</a>
      </footer>
    )
  }
});

module.exports = Home;
