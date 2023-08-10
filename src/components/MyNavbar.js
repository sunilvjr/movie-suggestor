import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <>
      <Navbar className="bg-dark ">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            <Link to="/" className="text-light">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end text-light gap-2">
            <Navbar.Text>
              <Link to="/AddMovie" className="text-light">
                Add Movie
              </Link>
            </Navbar.Text>
            |
            <Navbar.Text>
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/Profile" className="text-light">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Login" className="text-light">
                    Login
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavbar;
