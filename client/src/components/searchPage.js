import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, Form, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { getArticles } from "../actions/articleActions";
import PropTypes from "prop-types";

class SearchPage extends Component {
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const params = this.state;

    this.props.getArticles(params);
  };

  render() {
    const { articles } = this.props.article;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Title" onChange={this.onChange} />
          </FormGroup>

          <Row>
            <Col>
              <FormGroup>
                <Label>Date from</Label>
                <Input type="date" name="date" placeholder="Date Published" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>to</Label>
                <Input type="date" name="date" placeholder="Date Published" />
              </FormGroup>
            </Col>
          </Row>

          <div className="constraints">
            <FormGroup>
              <div className="constraint">
                <Row>
                  <Col>
                    <FormGroup>
                      <Input type="select" name="nameOfField[]">
                        <option value='Title'>Article Title</option>
                        <option value='Source'>Article Source</option>
                        <option value='Author'>Author</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="select" name="select[]">
                        <option value='Contains'>Contains</option>
                        <option value='DoesNotContain'>Does Not Contain</option>
                        <option value='BeginsWIth'>Begins With</option>
                        <option value='EndsWith'>Ends With</option>
                        <option value='IsEqualTo'>Is Equal To</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Input type="text" name="value[]" placeholder="Value" />
                  </Col>
                  <Col md="1">
                    <Button color="danger"><FontAwesomeIcon icon={faMinusCircle} /></Button>
                    <Button color="success"><FontAwesomeIcon icon={faPlusCircle} /></Button>
                  </Col>
                </Row>
              </div>
            </FormGroup>
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
          </tr>
        </thead>
        <tbody>
          {articles.map(({ _id, title, authors, journal }) => (
            <tr key={_id}>
              <td key={title}>{title}</td>
              <td key={authors}>{authors.join(", ")}</td>
              <td key={journal}>{journal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div >
    );
  }
}

SearchPage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

//Uses item: as that is what it was set to in reducers
const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticles })(SearchPage);
