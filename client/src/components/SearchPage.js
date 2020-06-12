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

  onSubmit = (e) => {
    e.preventDefault();

    const params = jQuery("form").serializeArray();

    var parameters = {};
    var pos;
    for (pos = 0; pos < 3; pos++) {
      var val = params[pos].value;
      if ((val !== null) && (val !== "")) {
        parameters[params[pos].name] = params[pos].value;
      }
    }

    for (var index = 0; index < count; index += 3) {
      var nameOfField = params[index + 3].value;
      var option = params[index + 4].value;
      var fieldValue = params[index + 5].value;

      if ((fieldValue !== null) && (fieldValue !== "")) {

        var filter

        if (option === "Contains") {
          filter = new RegExp(".*" + fieldValue + ".*").toString();
        } else if (option === "DoesNotContain") {
          filter = new RegExp("^((?!" + fieldValue + ").)*$").toString();
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
    const { articles } = this.props.article;
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
                <Label>Date from</Label>
                <Input
                  type="date"
                  name="dateFrom"
                  placeholder="Date Published"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>to</Label>
                <Input
                  type="date"
                  name="dateTo"
                  placeholder="Date Published"
                  onChange={this.onChange}
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
