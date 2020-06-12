import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getArticles } from "../actions/articleActions";
import PropTypes from "prop-types";
import jQuery from "jquery";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";

import { columns } from "./SearchTable";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


import { NavLink } from "reactstrap";

const { ToggleList } = ColumnToggle;
var count = 1;

jQuery(document).ready(function ($) {
  const min = 1;

  $(document).on("click", ".addBtn", function (e) {
    e.preventDefault();
    $(".constraint:first").clone().appendTo(".constraints");
    count++;
  });

  $(document).on("click", ".removeBtn", function (e) {
    e.preventDefault();
    if (count > min) {
      $(this).parent("div").parent("div").parent("div").parent("div").remove();
      count--;
    }
  });
});

class SearchPage extends Component {
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  state = {
    startDate: new Date(1970, 0, 1),
    endDate: new Date()
  };

  handleChangeDateFrom = date => {
    this.setState({ startDate: date });
  };

  handleChangeDateTo = date => {
    this.setState({ endDate: date });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const dynamicParams = jQuery("form").serializeArray();
    const staticParams = this.state;

    var parameters = {};

    parameters.year = { $gte: staticParams.startDate.getFullYear(), $lte: staticParams.endDate.getFullYear() };

    for (var index = 0; index < count; index += 3) {
      var nameOfField = dynamicParams[index + 1].value;
      var option = dynamicParams[index + 2].value;
      var fieldValue = dynamicParams[index + 3].value;

      if ((fieldValue !== null) && (fieldValue !== "")) {
        var filter
        if (option === "Contains") {
          filter = new RegExp(".*" + fieldValue + ".*", 'i').toString();
        } else if (option === "DoesNotContain") {
          filter = new RegExp("^((?!" + fieldValue + ").)*$", 'i').toString();
        } else if (option === "BeginsWIth") {
          filter = new RegExp("^" + fieldValue).toString();
        } else if (option === "EndsWith") {
          filter = new RegExp(fieldValue + "$").toString();
        } else if (option === "IsEqualTo") {
          filter = fieldValue;
        }

        parameters[nameOfField] = filter;
      }
    }

    console.log(parameters);
    this.props.getArticles(parameters);
  };

  render() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var { articles } = this.props.article;

    for (var key in articles) {
      var originalMonth = monthNames[articles[key].month - 1];
      var originalYear = articles[key].year;

      var publishDate = "";

      if ((originalMonth != null) && (originalMonth != "")) {
        publishDate += originalMonth + ", ";
      }
      if ((originalYear != null) && (originalYear != "")) {
        publishDate += originalYear;
      }

      articles[key].publishDate = publishDate;

      var journal = articles[key].journal;
      if ((journal != null) && (journal != "")) {
        var url = "http://" + journal;
        articles[key].url = <NavLink href={url} target="_blank">{journal}</NavLink>;
      }
    }

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              onChange={this.onChange}
            />
          </FormGroup>

          <Row>
            <Col>
              <FormGroup>
                <Label>Date From</Label>
                <br />
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeDateFrom}
                  dateFormat="MM.yyyy"
                  showMonthYearPicker
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Date To</Label>
                <br />
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleChangeDateTo}
                  dateFormat="MM.yyyy"
                  showMonthYearPicker
                  className="form-control"
                />
              </FormGroup>
            </Col>
          </Row>

          <div className="constraints">
            <div className="constraint">
              <FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="nameOfField"
                        onChange={this.onChange}
                      >
                        <option value="title">Article Title</option>
                        <option value="journal">Article Source</option>
                        <option value="author">Author</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="option"
                        onChange={this.onChange}
                      >
                        <option value="Contains">Contains</option>
                        <option value="DoesNotContain">Does Not Contain</option>
                        <option value="BeginsWIth">Begins With</option>
                        <option value="EndsWith">Ends With</option>
                        <option value="IsEqualTo">Is Equal To</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="fieldValue"
                      placeholder="Value"
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md="1">
                    <Button color="danger" className="removeBtn">
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                    <Button color="success" className="addBtn">
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </div>

            <div className="more-constraint"></div>
          </div>
          <Button color="primary">Search</Button>
        </Form>

        <hr />

        {/* Table with toggle columns */}
        <ToolkitProvider
          keyField="id"
          data={articles}
          columns={columns}
          columnToggle
        >
          {(props) => (
            <div>
              <ToggleList {...props.columnToggleProps} />
              <hr />
              <BootstrapTable {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

SearchPage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticles })(SearchPage);
