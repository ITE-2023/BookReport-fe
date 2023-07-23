import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "../css/Layout.module.css";

function Header() {
  return (
    <Navbar bg="none" className={styles.header} variant="dark">
      <Container>
        <Navbar.Brand href="/home/main">BOOKREPORT</Navbar.Brand>
        <Nav className="justify-text-end">
          <Nav.Link as={NavLink} to="/home/main" href="/home/main">
            HOME
          </Nav.Link>
          <Nav.Link as={NavLink} to="/account/login" href="/account/login">
            LOGIN
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
