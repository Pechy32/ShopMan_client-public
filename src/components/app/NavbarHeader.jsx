import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CartPlus, House } from "react-bootstrap-icons";
import { logout, getUser } from "../auth/AuthService";

function NavbarHeader() {
  const user = getUser();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ marginRight: "75px" }}>
          <CartPlus size={20} style={{ marginRight: "10px", marginBottom: "5px" }} />
          ShopMan
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* <Nav className="me-auto">
            <Nav.Link as={Link} to="/test">
              <House style={{ marginRight: "5px", marginBottom: "4px" }} />
              Test
            </Nav.Link>
          </Nav> */}
  
          {user && (
            <button
              className="btn btn-outline-dark ms-auto"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Odhlásit ({user.name})
            </button>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
