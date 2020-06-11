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
    console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var data = jQuery("form").serializeArray();

    console.log(JSON.stringify(data[3]));

    console.log(count);

    console.log("serialize: " + jQuery("form").serialize());
    console.log("\r\n");
    console.log(
      "serializeArray: " + JSON.stringify(jQuery("form").serializeArray())
    );

    const params = this.state;

    console.log(params);

    console.log(this.props.getArticles(params));
  };

  render() {
    const { articles } = this.props.article;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
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
                        <option value="source">Article Source</option>
                        <option value="authors">Author</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="select"
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
