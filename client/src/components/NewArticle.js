import React, { Component } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";

class NewArticle extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" placeholder="Article Title" onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label>Authors</Label>
          <Input type="string" name="authors" placeholder="Article Authors" onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label>Journal</Label>
          <Input type="string" name="journal" placeholder="Journal" onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input type="date" name="date" onChange={this.onChange} />
        </FormGroup>

        <Button color="primary">Submit Article</Button>
      </Form>
    );
  }
}

export default NewArticle;
