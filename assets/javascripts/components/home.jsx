/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var FiresizeLogo = require('../../images/logo.png');

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
          <h2>No Code Required</h2>
          <p>Firesize only needs a simple url. You don't need to write any
          code or include any libraries -- just prefix your current image urls
          with your new FireSize subdomain. That's it.</p>
        </div>
        <div className="homepage-feature-box">
          <h2>Built-in CDN</h2>
          <p>After resizing your images, we'll host them behind a CDN free of
          charge. Your images will be quickly delivered to your users, and
          only new resizes will count towards your plan's limit each month.</p>
        </div>
      </section>
    )
  },

  footer: function() {
    return (
      <footer className="center mt4">
        <p className="h2 mb4">Built by the community on <a href="https://assembly.com/firesize" target="_blank">Assembly</a></p>
        <hr />
        <div className="mb3">
          <Link to="docs" className="mr3">Docs</Link>
          <a className="mr3" href="mailto:firesize@helpful.io">Support</a>
          <a className="mr3" href="https://addons.heroku.com/firesize">Heroku Add-on</a>
          <a className="mr3" href="https://assembly.com/firesize">Assembly</a>
        </div>
      </footer>
    )
  }
});

module.exports = Home;
