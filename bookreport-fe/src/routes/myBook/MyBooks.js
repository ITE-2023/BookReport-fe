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
import { useState, useEffect } from "react";
import { getCookie } from "../../api/cookie.js";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../api/customAxios.js";
import "../../css/MyBooks.css";

function MyBooks() {
  const navigate = useNavigate();

  const [myBooks, setMyBooks] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  const find_myBooks = async (year, currentPage) => {
    await customAxios.myBooks(year, currentPage).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setTotalPage(res.data.totalPage);
        setMyBooks(res.data.myBooks);
      }
    });
  };

  const isLoggedIn = getCookie("accessToken") !== undefined;
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/member/login");
    } else {
      find_myBooks(year, currentPage);
    }
  }, [isLoggedIn, navigate, year, currentPage]);

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
            <h3 className="m-0">내 서재</h3>
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
