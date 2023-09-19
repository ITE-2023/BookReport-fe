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
import styles from "../../css/MyBooks.module.css";

function MyBooks() {
  const navigate = useNavigate();

  const [myBooks, setMyBooks] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  // 연도 선택
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearOptions = [];
  const [year, setYear] = useState(currentYear);
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  const onChangeYear = (e) => {
    setYear(parseInt(e.target.value, 10));
  };

  const find_myBooks = async (year, currentPage) => {
    await customAxios.myBooks(year, currentPage).then((res) => {
      if (res.status === 200) {
        setTotalPage(res.data.totalPage);
        setMyBooks(res.data.myBooks);
        console.log(res.data.totalPage);
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

  return (
    <Layout>
      <Hero></Hero>
      <Container className="pb-5">
        <Card className="shadow mt--400 p-5">
          <div className="ml-1 d-flex align-items-center">
            <h3 className="m-0">내 서재</h3>
            <select className={styles.select} onChange={onChangeYear}>
              {yearOptions}
            </select>
          </div>
          {myBooks.length !== 0 ? (
            <div>
              <Row className="mt-5">
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    {myBooks[0].myBookDTO.myBookStatus}
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
                <Col className={styles.box}>
                  <Badge className="text-uppercase mb-2" color="success" pill>
                    Success
                  </Badge>
                  <img
                    className={styles.bookImage}
                    src="https://shopping-phinf.pstatic.net/main_3243610/32436104744.20230905101559.jpg"
                    alt="bookImage"
                  ></img>
                  <p className={styles.title}>
                    달러구트 꿈 백화점 1 (주문하신 꿈은 매진입니다)
                  </p>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="text-center m-5">
              내 서재에 담긴 책이 존재하지 않습니다.
            </div>
          )}

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
