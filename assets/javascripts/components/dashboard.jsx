/** @jsx React.DOM */

var React = require('react');

var Navbar = require('./navbar.jsx');

var Dashboard = React.createClass({
  mixins: [require('../lib/authenticated_route')],

  componentWillMount: function() {
    document.title = 'Dashboard';
  },

  render: function() {
    return (
      <div>
        <Navbar />

        <div className="container mt3">
          <div className="bg-white border p3">
            <h2 className="mt0">Getting Started</h2>
            <p className="mb0">Look's like you're new around here. We'll, first
            things first. Take a look at the <a href="#">documentation</a> to
            start using FireSize. Once you're using the service you can always
            check back here to check your usage for the month or change
            configuration options.</p>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">Usage for March</h2>
            <p className="mb2 h3">You've used <strong>86/100</strong> of your <strong>Test</strong> plan this month.</p>

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
                  <tr>
                    <td>https://assembly.firesize.com/500x300/g_center/http://imgur.com/afhj348fh4</td>
                    <td>03/12/2015 12:05PM EST</td>
                  </tr>
                  <tr>
                    <td>https://assembly.firesize.com/500x300/g_center/http://imgur.com/afhj348fh4</td>
                    <td>03/12/2015 12:05PM EST</td>
                  </tr>
                  <tr>
                    <td>https://assembly.firesize.com/500x300/g_center/http://imgur.com/afhj348fh4</td>
                    <td>03/12/2015 12:05PM EST</td>
                  </tr>
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
                  <input type="text" className="block full-width field-light" value="assembly.firesize.com" />
                </div>

                <div className="mb2">
                  <label className="h6 gray bold caps block full-width">Request Signing</label>
                  <input type="checkbox" className="field-light mr1" style={{ height: '1rem' }} />
                  <span className="mt2">Require all requests to be signed</span>
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
