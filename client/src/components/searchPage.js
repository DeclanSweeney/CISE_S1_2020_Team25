import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class SearchPage extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Description</Label>
          <Input type="text" name="description" placeholder="Descrption" />
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
    );
  }
}

export default SearchPage;
