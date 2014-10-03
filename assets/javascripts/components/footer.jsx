/**
 * @jsx React.DOM
 */

var React = require('react');
//LESS
require('stylesheets/components/footer.less');


var Footer = React.createClass({

	render: function() {
		return (
			<div className="fs-footer container">
				<h3 className="fs-footer-title">Made with 100% pure Open Source Code</h3>
				<div className="fs-footer-content">
					We don't fuck around. Our code is hand crafted by the finest developers and delivered to you without
					proprietary licenses or artificial flavoring.
				</div>
			</div>
		);
	}

});

module.exports = Footer;