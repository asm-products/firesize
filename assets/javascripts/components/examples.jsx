/** @jsx React.DOM */

var React = require('react');

var Examples = React.createClass({
  render: function() {
    return <div className="container">
      <h1>Firesize examples</h1>

      <div className="annotation">
        <h2>Fixed width proportionate height</h2>
      </div>
      <div className="content">
        <img src="/128x/g_center/http://placekitten.com/g/32/32" />
        <img src="/128x/g_center/http://placekitten.com/g/800/600" />
        <img src="/128x/g_center/http://placekitten.com/g/1024/320" />
        <img src="/128x/g_center/http://placekitten.com/g/320/1024" />
      </div>

      <div className="annotation">
        <h2>Fixed height proportionate width</h2>
      </div>
      <div className="content">
        <img src="/x128/g_center/http://placekitten.com/g/32/32" />
        <img src="/x128/g_center/http://placekitten.com/g/800/600" />
        <img src="/x128/g_center/http://placekitten.com/g/1024/320" />
        <img src="/x128/g_center/http://placekitten.com/g/320/1024" />
      </div>

      <div className="annotation">
        <h2>Fixed height and width</h2>
      </div>
      <div className="content">
        <img src="/128x128/http://placekitten.com/g/32/32"/>
        <img src="/128x128/http://placekitten.com/g/800/600"/>
        <img src="/128x128/http://placekitten.com/g/1024/320"/>
        <img src="/128x128/http://placekitten.com/g/320/1024"/>
      </div>

      <div className="annotation">
        <h2>Fixed height and width, crop to center</h2>
      </div>
      <div className="content">
        <img src="/128x128/g_center/http://placekitten.com/g/32/32"/>
        <img src="/128x128/g_center/http://placekitten.com/g/800/600"/>
        <img src="/128x128/g_center/http://placekitten.com/g/1024/320"/>
        <img src="/128x128/g_center/http://placekitten.com/g/320/1024"/>
      </div>

      <div className="annotation">
        <h2>PSD thumbnails</h2>
      </div>
      <div className="content">
        <img src="/128x128/g_center/frame_0/http://asm-assets.s3.amazonaws.com/helpful-signup-04-24-14.psd"/>
      </div>
    </div>
  }
})

module.exports = Examples
