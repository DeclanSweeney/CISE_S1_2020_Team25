import React, { Component } from "react";
import { Container, FormGroup, Label, Input, Form, Button } from "reactstrap";

class SearchPage extends Component {
  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label>Descrption</Label>
            <Input type="text" name="description" placeholder="Descrption" />
          </FormGroup>
          <Button>Search</Button>
        </Form>
      </Container>
    );
  }
}

export default SearchPage;
