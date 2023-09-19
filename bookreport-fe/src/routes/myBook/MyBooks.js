import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import {
  Card,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
import { useState } from "react";

import "../../css/MyBooks.css";

function MyBooks() {
  // 연도 선택
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const onChangeYear = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };
  return (
    <Layout>
      <Hero></Hero>
      <Container className="pb-5">
        <Card className="shadow mt--400 p-5">
          <div className="ml-1 d-flex align-items-center">
            <h3>내 서재</h3>
            <select className="select ml-3" onChange={onChangeYear}>
              {yearOptions}
            </select>
          </div>
          <Row className="mt-5">
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
            <Col className="box">
              <Badge className="text-uppercase mb-2" color="success" pill>
                Success
              </Badge>
              <img
                className="bookImage mb-2"
                src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                alt="bookImage"
              ></img>
              <p className="title">
                달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
              </p>
            </Col>
          </Row>
          <Pagination className="m-auto">
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-angle-left" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="active">
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-angle-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Card>
      </Container>
    </Layout>
  );
}

export default MyBooks;
