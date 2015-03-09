/** @jsx React.DOM */

var React = require('react');
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;

var IntroBlock = React.createClass({
  displayName: "IntroBlock",

  render: function() {
    return (
      <div className="fs-introblock" >
        <Grid className="fs-introblock-grid">
          <Row>
            <Col className="fs-introblock-block" md={6}>
              <div className="fs-introblock-block-icon  fs-introblock-block-icon-resize ">
                <i className="fa fa-arrows-alt "></i>
              </div>
              <h3 className="fs-introblock-block-title">Dynamic Resizing</h3>
              <div className="fs-introblock-block-content">
                Resize images on the fly. No need to run huge batch operations whenever you need your images at a new resolution.
              </div>
            </Col>
            <Col className="fs-introblock-block" md={6}>
              <div className="fs-introblock-block-icon  fs-introblock-block-icon-spin">
                <i className="fa fa-globe"></i>
              </div>
              <h3 className="fs-introblock-block-title">No lock-in</h3>
              <div className="fs-introblock-block-content">
                We'll resize your images no matter where they're stored. No need to upload them to us. You can also bring your own CDN
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

});

module.exports = IntroBlock;
