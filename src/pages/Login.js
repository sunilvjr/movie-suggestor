import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Form, Button, Modal } from "react-bootstrap";

const Login = () => {
  const history = useHistory();
  const email_ref = useRef();
  const password_ref = useRef();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  //Form Submit
  const LoginHandler = async (e) => {
    e.preventDefault();

    const LoginData = {
      email: email_ref.current.value,
      password: password_ref.current.value,
    };

    try {
      //Calling API..
      var repsonse = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        LoginData,
        { timeout: 10000 }
      );

      //Storing Access token in local Storage
      const getAccessToken = repsonse.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);

      if (repsonse.data.status === "success") {
        // alert("Logged in successful.");
        setModalMessage("Logged in successful.redirecting...");
        setShowModal(true);
      }
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (ex) {
      //Error Handling
      console.log(ex.response.data.errors[0].message);
      if (ex.response) {
        //alert(ex.response.data.errors[0].message);
        setModalMessage(ex.response.data.errors[0].message);
        setShowModal(true);
      } else {
        // alert("Unknown error occured! Please try again after few minutes");
        setModalMessage(
          "Unknown error occured! Please try again after few minutes"
        );
        setShowModal(true);
      }
    }
  };

  //UI part
  return (
    <>
      <MyNavbar />
      <Container>
        <br />
        <h3>Login</h3>
        <br />
        <form onSubmit={LoginHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email_ref}
              autoComplete="false"
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
          {/* <b>Email</b>
          <br />
          <input type="text" ref={email_ref}></input>
          <br />
          <br /> */}
          {/* <b>Password</b>
          <br />
          <input type="password" ref={password_ref}></input>
          <br /> */}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password_ref}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Login
          </Button>
          {/* <button type="submit">Login</button> */}
        </form>
      </Container>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => {}}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
