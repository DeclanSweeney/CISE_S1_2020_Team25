import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addArticle } from "../actions/articleActions";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class NewArticle extends Component {
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var params = this.state;

    var pageRange = params.fromPage + "--" + params.toPage;

    params.pages = pageRange;

    console.log(params.pages);
    console.log(params);

    this.props.addArticle(params);
  };

  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    // var monthNames = new Array();
    // monthNames[0] = "January";
    // monthNames[1] = "February";
    // monthNames[2] = "March";
    // monthNames[3] = "April";
    // monthNames[4] = "May";
    // monthNames[5] = "June";
    // monthNames[6] = "July";
    // monthNames[7] = "August";
    // monthNames[8] = "September";
    // monthNames[9] = "October";
    // monthNames[10] = "November";
    // monthNames[11] = "December";
    // var month = monthNames[date.getMonth()];

    var year = date.getYear() + 1900;

    this.setState({
      month: date.getMonth() + 1,
      year: year,
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Article Title"
            onChange={this.onChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Authors</Label>
          <Input
            type="string"
            name="author"
            placeholder="Article Authors"
            onChange={this.onChange}
            required
          />
          <small className="form-text text-muted">
            Please enter names comma separated e.g "John, Mark..."
          </small>
        </FormGroup>

        <Row>
          <Col>
            <FormGroup>
              <Label>Journal</Label>
              <Input
                type="string"
                name="journal"
                placeholder="Journal"
                onChange={this.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Volume</Label>
              <Input
                type="string"
                name="volume"
                placeholder="Volume"
                onChange={this.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Version</Label>
              <Input
                type="string"
                name="number"
                placeholder="Version"
                onChange={this.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label>From page</Label>
              <Input
                type="string"
                name="fromPage"
                placeholder="Page"
                onChange={this.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>To page</Label>
              <Input
                type="string"
                name="toPage"
                placeholder="Page"
                onChange={this.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label>Date</Label>
          <br />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="MM.yyyy"
            showMonthYearPicker
            className="form-control"
          />
        </FormGroup>
        <Button color="primary">Submit Article</Button>
      </Form>
    );
  }
}

NewArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { addArticle })(NewArticle);
