import React, { Component } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addArticle } from "../actions/articleActions";

class NewArticle extends Component {
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var params = this.state;

    var authors = params.authors;
    var array = [];
    if (authors.indexOf(',') !== -1) {
      array = authors.split(',');
    } else {
      array[0] = authors;
    }

    params.authors = array;

    console.log(params);

    this.props.addArticle(params);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" placeholder="Article Title" onChange={this.onChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Authors</Label>
          <Input type="string" name="authors" placeholder="Article Authors" onChange={this.onChange} required />
          <small className="form-text text-muted">Please enter names comma separated e.g "John, Mark..."</small>
        </FormGroup>

        <FormGroup>
          <Label>Journal</Label>
          <Input type="string" name="journal" placeholder="Journal" onChange={this.onChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input type="date" name="date" onChange={this.onChange} required />
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
