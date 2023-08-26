import React from "react";

import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("../assets/img/LOGO.-removebg-preview1111.png"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("../assets/img/LOGO.-removebg-preview1111.png"),
    altText: "",
    caption: "",
    header: "",
  },
];

function Hero() {
  return (
    <>
      <div>
        <section className="section section-hero section-shaped">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-md-5">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-white font-weight-light">Music & Book</h1>
                <p className="lead text-white mt-4">
                  감정을 쓰며, 음악을 만나 독서 경험을 공유하는 플랫폼
                </p>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
