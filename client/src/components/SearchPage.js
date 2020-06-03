import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getArticles } from "../actions/articleActions";
import PropTypes from "prop-types";
import jQuery from "jquery";

var count = 1;

jQuery(document).ready(function ($) {
  const max = 5;
  const min = 1;

  $(document).on("click", ".addBtn", function (e) {
    e.preventDefault();
    if (count < max) {
      $(".constraint:first").clone().appendTo(".constraints");
      count++;
    }
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

    // const transactions = Transaction.find({
    //   date_paid: {
    //         $gte: new Date(new Date(startDate).setHours(00, 00, 00))
    //         $lt: new Date(new Date(endDate).setHours(23, 59, 59))
    //          }
    //   }).sort({ date_paid: 'asc'})
    // }
    // var fieldName = this.state.nameOfField;
    // var fieldValue = this.state.fieldValue;

    var data = jQuery("form").serializeArray();

    console.log(JSON.stringify(data[3]));

    console.log(count);

    // for (var )
    // for (var i = 0; i < 3; i++) {
    //   console.log(data[i]);
    // }

    console.log("serialize: " + jQuery("form").serialize());
    console.log("\r\n");
    console.log(
      "serializeArray: " + JSON.stringify(jQuery("form").serializeArray())
    );

    /*
    [{ "name": "title", "value": "asdadsa" },
    { "name": "date", "value": "" },
    { "name": "date", "value": "" },
    { "name": "nameOfField", "value": "Title" },
    { "name": "select", "value": "Contains" },
    { "name": "fieldValue", "value": "" }]
*/

    if (data.name == "nameOfField") {
    }

    // count = 1;
    // count+3;

    // data.forEach(function (e) {
    //   if (e.name == "nameOfField") {

    //   }

    // });

    // {
    //   { title: "Hello" },
    //   { date: "date" },
    //   { [NAMEOFFIELD]: [FIELDVALUE]}
    // }

    // const params = {}

    const params = this.state;

    console.log(params);
    this.props.getArticles(params);
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
        <Table className="articles-list">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(({ _id, title, authors, journal, date }) => (
              <tr key={_id}>
                <td key={title}>{title}</td>
                <td key={authors}>{authors.join(", ")}</td>
                <td key={journal}>{journal}</td>
                <td key={date}>{("0" + new Date(date).getDate()).slice(-2)}/{("0" + (new Date(date).getMonth() + 1)).slice(-2)}/{new Date(date).getFullYear()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
