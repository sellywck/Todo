
import { useContext } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext';
import Footer from '../components/Footer';



export function RootLayout() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext)

  function logout (){
    authContext.setToken(null);
    navigate('/')
  }

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/" style={{fontSize: '30px'}}>TaskBoost <span><i className="bi bi-fire" style={{color: 'red', fontSize: '35px'}}></i></span> </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              TaskBoost
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" style={{fontSize: '16px'}}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="register">Sign Up</Nav.Link>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="tasklist">Task List</Nav.Link>
                <Nav.Link href="contact">Contact Us</Nav.Link>
                <Button
                    className="StartForFreeNavBar"
                    onClick={logout}
                    variant="danger"
                  >
                    Logout
                  </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Footer/>
      <Outlet/>
    </>
  );
}