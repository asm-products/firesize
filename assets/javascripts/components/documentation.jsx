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
            to the src attribute. Firesize automatically grabs the original
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
            <h2 className="mt0">Heroku Environment Variables</h2>
            <p className="mb0">When you add Firesize as an add-on, we'll
            generate a unique subdomain for your account and assign it to
            the <code>FIRESIZE_URL</code> environment variable. We recommend
            reading up on how Heroku recommends using environment variables to
            configure your applications. Also, below are some examples of using
            the <code>FIRESIZE_URL</code> with popular templating
            languages.</p>
          </div>
          <div className="bg-white border-left border-right border-bottom p3">
            <h4 className="h6 gray bold caps mb1">image_sample.html.erb</h4>

            <Highlight>
              {'<img src="<%= ENV[\'FIRESIZE_URL\'] %>/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>

            <h4 className="h6 gray bold caps mt3 mb1">image_sample.html.ejs</h4>

            <Highlight>
              {'<img src="<%= process.env.FIRESIZE_URL %>/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>

            <h4 className="h6 gray bold caps mt3 mb1">image_sample.html.jinja2</h4>

            <Highlight>
              {'<img src="{{os.environ[\'FIRESIZE_URL\']}}/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">Resizing Options</h2>
            <p className="mb3">As you saw above, each image resizing option can
            be included as a url segment directly in the Firesize url. Below
            are a list of options, allowed values and what they mean. You can
            include any number of these options in any order as long as they
            come before the original image url as the last url segment.</p>

            <h3>Dimensions</h3>
            <div className="mb3">
              <div>
                <p className="h4 mb0">
                  <strong>[horizontal]x[vertical]</strong>
                </p>
                <p className="h5">
                  Specifies the new dimensions in pixels of the resized image. 
                </p>
              </div>
            </div>

            <h3>Gravity</h3>
            <div className="mb3">
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_none</strong>
                </p>
                <p className="h5">
                  Does not crop the image. Instead resizes to the largest bounds comtained in the specified dimensions.
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_center</strong>
                </p>
                <p className="h5">
                  Crops the image from the center
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_northwest</strong>
                </p>
                <p className="h5">
                  Crops the image from the top left corner
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_north</strong>
                </p>
                <p className="h5">
                  Crops the image from the top
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_southeast</strong>
                </p>
                <p className="h5">
                  Crops the image from the bottom right corner
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_south</strong>
                </p>
                <p className="h5">
                  Crops the image from the bottom
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_southwest</strong>
                </p>
                <p className="h5">
                  Crops the image from the bottom left corner
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_west</strong>
                </p>
                <p className="h5">
                  Crops the image from the left
                </p>
              </div>
              <div className="mb2">
                <p className="h4 mb0">
                  <strong>g_northeast</strong>
                </p>
                <p className="h5">
                  Crops the image from the top right corner
                </p>
              </div>
              <div>
                <p className="h4 mb0">
                  <strong>g_east</strong>
                </p>
                <p className="h5">
                  Crops the image from the right
                </p>
              </div>
            </div>

            <h3>Frame</h3>
            <div className="mb3">
              <div>
                <p className="h4 mb0">
                  <strong>frame_[number]</strong>
                </p>
                <p className="h5">
                  If the image file has multiple frames, like an animated gif for instance, only the frame with the index specified will be 
                </p>
              </div>
            </div>

            <h3>Format</h3>
            <div>
              <div>
                <p className="h4 mb0">
                  <strong>png, jpg, jpeg, gif</strong>
                </p>
                <p className="h5 mb0">
                  Convert the image into the specified file format
                </p>
              </div>
            </div>
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
