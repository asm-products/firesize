/** @jsx React.DOM */

var React = require('react');

var Highlight = require('../lib/highlight.jsx');

var Documentation = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  componentWillMount: function() {
    document.title = 'Docs';
  },

  render: function() {
    return (
      <div>
        <div className="container py3">
          <div className="bg-white border p3">
            <h2 className="mt0">Getting Started</h2>
            <p className="mb0">Let's resize your first image. All you have to
            do is take your original image url and add the firesize url prefix
            to the src attribute. FireSize automatically grabs the original
            image and resizes it on the fly. Here's an example:</p>
          </div>
          <div className="bg-white border-left border-right border-bottom p3">
            <h4 className="h6 gray bold caps mt0 mb1">before.html</h4>

            <Highlight>
              {'<img src="https://imgur.com/28h4fh34">'}
            </Highlight>

            <h4 className="h6 gray bold caps mt3 mb1">after.html</h4>

            <Highlight>
              {'<img src="https://assembly.firesize.com/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>
          </div>
          <div className="bg-white border-left border-right border-bottom p3">
            <p className="mb0">Now, I bet you're wondering what those extra url segments are
            for. The first one <code>500x300</code> specifies the dimensions of
            the resized image and <code>g_center</code> tells the resizer what
            to do if the original image is too big. In this case we just crop
            from the center. Let's take a look at all of the url segment
            options in the next section</p>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">Resizing Options</h2>
            <p className="mb3">As you saw above, each image resizing option can
            be included as a url segment directly in the FireSize url. Below
            are a list of options, allowed values and what they mean. You can
            include any number of these options in any order as long as they
            come before the original image url as the last url segment.</p>

            <h3>Dimensions</h3>
            <p className="mb3">[horizontal-pixels]x[vertical-pixels]</p>

            <h3>Gravity</h3>
            <p className="mb3">
              g_none
              g_center
              g_east
              g_forget
              g_northeast
              g_north
              g_northwest
              g_southeast
              g_south
              g_southwest
              g_west
            </p>

            <h3>Frame</h3>
            <p className="mb3">
              frame_[frame-number]
            </p>

            <h3>Format</h3>
            <p className="mb3 mb0">
              png
              jpg
              jpeg
              gif
            </p>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">CDN and Caching</h2>
            <p className="mb0">We handle all the image caching for you. The
              first time you request an image, we'll go ahead and run the
              resizing operation and cache the original. The next time you
              request that image with the exact same resizing options, we'll
              serve it directly from our CloudFront cache. Also, any images
              served directly from the cache will not count towards your
              resized images quota for the month.
            </p>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Documentation;
