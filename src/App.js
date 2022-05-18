import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
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
import { BrowserRouter } from "react-router-dom";

import { login, logout } from "./ConnectToNEAR";

function App() {
  const [userMessage, changeUserMessage] = useState(
    "User message will appear here!"
  );
  const [buttonDisable, changeButtonDisable] = useState(false);

  const messageRef = useRef();

  useEffect(() => {
    const getMessage = async () => {
      changeUserMessage(
        await window.contract.get_message({ account_id: window.accountId })
      );
    };
    getMessage();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    changeButtonDisable(true);
    await window.contract.set_message({ message: messageRef.current.value });
    alert("please refresh page");
  };

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>NEAR Protocol</Navbar.Brand>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Nav.Link onClick={window.accountId === "" ? login : logout}>
              {console.log(window.accountId)}
              {window.accountId === "" ? "Login" : window.accountId}
            </Nav.Link>
          </Nav>
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
              onClick={submit}
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
