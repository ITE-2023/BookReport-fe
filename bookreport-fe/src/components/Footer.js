import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import styles from "../css/Layout.module.css"


function Footer() {
    return (
      <>
        <footer className={`footer ${styles.footer}`}>
          <Container>
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">© {new Date().getFullYear()} </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/geunyoung490/BookReport-fe"
                      target="_blank"
                    >
                      Front-End
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/geunyoung490/BookReport"
                      target="_blank"
                    >
                      Back-End
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.creative-tim.com?ref=adsr-footer"
                      target="_blank"
                    >
                      Creative Tim
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
}

export default Footer;
