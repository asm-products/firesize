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
            <p className="mb0">You've used <strong>86/100</strong> of your <strong>Test</strong> plan this month.</p>
          </div>

          <div className="bg-white border p3 mt3">
            <h2 className="mt0">Config</h2>

            <form>
              <div>
                <label>Subdomain</label>
                <input type="text" value="assembly.firesize.com" />
              </div>

              <div>
                <label>Require all requests to be signed</label>
                <input type="checkbox" />
              </div>

              <input type="submit" value="Save" className="mb0" />
            </form>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Dashboard;
