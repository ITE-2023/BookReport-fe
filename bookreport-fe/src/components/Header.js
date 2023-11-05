import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../api/cookie.js";
import "../css/App.css";

function Header() {
  const componentDidMount = () => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

  const navigate = useNavigate();

  const token = getCookie("accessToken");
  const logout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    navigate("/");
  };
  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                id="logo"
                alt="..."
                src={require("../assets/img/logo.png")}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse toggler="#navbar_global" navbar>
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img alt="..." src={require("../assets/img/logo.png")} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {token ? (
                  <>
                    <NavItem>
                      <NavLink onClick={logout} href="#">
                        로그아웃
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/myBooks" to="/myBooks">
                        내 서재
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <NavLink href="/member/login" to="/member/login">
                        로그인
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/member/join" to="/member/join">
                        회원가입
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
