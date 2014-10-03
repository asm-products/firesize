/**
 * @jsx React.DOM
 */

var React = require('react');
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;

//LESS
require('stylesheets/components/intro.less');
require("font-awesome-webpack");

var IntroBlock = React.createClass({

	displayName: "IntroBlock",

	render: function() {
		return (
			<div className="fs-introblock" >
				<Grid className="fs-introblock-grid">
					<Row>
						<Col className="fs-introblock-block" md={4}>
							<i className="fa fa-arrows-alt"></i>
							<h3 className="fs-introblock-block-title">Dynamic Resizing</h3>
							<div className="fs-introblock-block-content">
								Change image sizes on the fly.
								We'll automatically create new thumbnail or 2x "retina" versions of your images.
							</div>
						</Col>
						<Col className="fs-introblock-block" md={4}>
							<i className="fa fa-fast-forward"></i>
							<h3 className="fs-introblock-block-title">Fast Loading</h3>
							<div className="fs-introblock-block-content">
								Change image sizes on the fly.
								We'll automatically create new thumbnail or 2x "retina" versions of your images.
							</div>
						</Col>
						<Col className="fs-introblock-block" md={4}>
							<i className="fa fa-globe"></i>
							<h3 className="fs-introblock-block-title">Automatic Caching</h3>
							<div className="fs-introblock-block-content">
								Change image sizes on the fly.
								We'll automatically create new thumbnail or 2x "retina" versions of your images.
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}

});

module.exports = IntroBlock;