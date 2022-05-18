import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import {
  Alert,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  Card,
} from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userMessage, changeUserMessage] = useState(
    "User message will appear here!"
  );
  const [buttonDisable, changeButtonDisable] = useState(false);

  const messageRef = useRef();

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>NEAR Protocol</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <Nav.Link eventKey={2} href='#memes'>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row
          style={{ marginTop: "10vh" }}
          className='d-flex justify-content-center'
        >
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Your Message</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Display Port for your message to the world! Or at lease Miami
              </Card.Subtitle>
              <Alert>{userMessage}</Alert>
            </Card.Body>
          </Card>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Enter Your Message Here</Form.Label>
              <Form.Control ref={messageRef} placeholder='Enter Message' />
            </Form.Group>

            <Button
              disabled={buttonDisable}
              // onClick={submit}
              variant='primary'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
