import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Button, Modal } from "react-bootstrap";

const Profile = () => {
  //For navigation
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Do you want to logged out?"
  );

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      //Calling API with Bearer Token..
      var repsonse = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(repsonse);
      setUserData(repsonse.data.data);
    } catch (ex) {
      //Error Handling
      console.log(ex.response.data.errors[0].message);
      if (ex.response) {
        alert(ex.response.data.errors[0].message);
      } else {
        alert("Unknown error occured! Please try again after few minutes");
      }
    }
  };

  //Event Handler
  const LogoutHandler = (e) => {
    e.preventDefault();
    // localStorage.removeItem("accessToken");
    // history.replace("/");
    setShowModal(true);
  };

  //UI
  return (
    <>
      <MyNavbar />
      <br />
      <Container>
        <h3>My Profile</h3>
        {/* <button type="submit" onClick={LogoutHandler}>
          Logout
        </button> */}
        <br /> <br />
        Name:{userData.name}
        <br />
        Email:{userData.email}
        <br />
        Country:{userData.country}
        <br /> <br />
        <Button variant="danger" type="button" onClick={LogoutHandler}>
          Login
        </Button>
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
            variant="danger"
            onClick={() => {
              setShowModal(false);
              localStorage.removeItem("accessToken");
              history.replace("/");
            }}
          >
            Ok
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
