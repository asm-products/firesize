/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var request = require('superagent');
var url = require('url');

var Highlight = require('../lib/highlight.jsx');
var auth = require('../lib/auth');

var Dashboard = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  getInitialState: function() {
    return {
      subdomain: 'subdomain',
      plan: 'Free',
      plan_limit: 100,
      request_count: 0,
      requests: [],
      only_allow_whitelisted: false
    }
  },

  componentWillMount: function() {
    document.title = 'Firesize | Dashboard';
  },

  componentDidMount: function() {
    request.get('/api/account').
      set('Authorization', 'Bearer ' + sessionStorage && sessionStorage.getItem('token')).
      end(function(error, response) {
        var account = response.body;
        this.setState(account);
      }.bind(this));
  },

  render: function() {
    var emptyState
    if (!this.state.requests.length) {
      emptyState = <tr><td><span className="gray">Haven't seen any requests yet.</span></td></tr>
    }

    return (
      <div>
        <div className="container py3">
          <div className="bg-white border p3">
            <h2 className="mt0">Getting Started</h2>
            <p className="mb0">Look's like you're new around here. We'll, first
            things first. Take a look at the <Link to="authdocs">Getting Started guide</Link> to
            start using FireSize. Once you're using the service you can always
            check back here to check your usage for the month or change
            configuration options.</p>
          </div>

          <div className="bg-white border-left border-right border-bottom p3">
            <h4 className="h6 gray bold caps mt0 mb1">image_sample.html</h4>

            <Highlight>
              {'<img src="https://' + this.state.subdomain + '.firesize.com/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>

            <h4 className="h6 gray bold caps mt3 mb1">image_sample.html.erb</h4>

            <Highlight>
              {'<img src="<%= ENV[\'FIRESIZE_URL\'] %>/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>

            <h4 className="h6 gray bold caps mt3 mb1">image_sample.html.ejs</h4>

            <Highlight>
              {'<img src="<%= process.env.FIRESIZE_URL %>/500x300/g_center/https://imgur.com/28h4fh34">'}
            </Highlight>

            <div className="mt3">
              <Link to="authdocs">See more examples</Link>
            </div>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">Usage for March</h2>
            <p className="mb2 h3">You've used <strong>{this.state.request_count}/{this.state.plan_limit}</strong> of your <strong>{this.state.plan}</strong> plan this month.</p>

            <h4 className="h6 gray bold caps">Recent Requests</h4>
            <div className="overflow-scroll">
              <table className="table-light mxn2 h6">
                <thead>
                  <tr>
                    <th>Request</th>
                    <th>Requested At</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.requests.map(function(request) {
                    return (
                      <tr>
                        <td>{request.url}</td>
                        <td>{request.created}</td>
                      </tr>
                    )
                  })}
                  {emptyState}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border p3 mt3 clearfix">
            <h2 className="mt0">Configuration</h2>

            <form className="col sm-col-6">
              <fieldset className="fieldset-reset">
                <div className="mb2">
                  <label className="h6 gray bold caps">Subdomain</label>
                  <input type="text" className="block full-width field-light" value={this.state.subdomain} />
                </div>

                <div className="mb2">
                  <label className="h6 gray bold caps block full-width">Source URL Whitelisting</label>
                  <input type="checkbox" className="field-light mr1" style={{ height: '1rem' }} value={this.state.only_allow_whitelisted} />
                  <span className="mt2">Only allow whitelisted sources</span>
                </div>
              </fieldset>

              <button type="submit" className="button">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Dashboard;
