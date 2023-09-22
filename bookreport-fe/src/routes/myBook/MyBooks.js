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

  const myBookDetail = (e) => {
    navigate(`/myBook/detail/${e}`);
  };

  const repeatMyBooks = (myBooks) => {
    let arr = [];
    const numIterations = Math.min(myBooks.length, 5);
    for (let i = 0; i < numIterations; i++) {
      arr.push(
        <Col
          className={styles.box}
          onClick={() => myBookDetail(myBooks[i].myBookDTO.id)}
          key={myBooks[i].myBookDTO.id}
        >
          {myBooks[i].myBookDTO.myBookStatus === "읽은 책" ? (
            <Badge className="text-uppercase mb-2" color="primary" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}
          {myBooks[i].myBookDTO.myBookStatus === "읽는 중인 책" ? (
            <Badge className="text-uppercase mb-2" color="info" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}
          {myBooks[i].myBookDTO.myBookStatus === "읽고 싶은 책" ? (
            <Badge className="text-uppercase mb-2" color="danger" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}

          <img
            className={styles.bookImage}
            src={myBooks[i].bookDTO.imageUrl}
            alt="bookImage"
          ></img>
          <p className={styles.title}>{myBooks[i].bookDTO.bookName}</p>
        </Col>
      );
    }

    for (let i = 5 - numIterations; i > 0; i--) {
      arr.push(<Col key={`${i}1`}></Col>);
    }
    return arr;
  };

  const repeatMyBooks2 = (myBooks) => {
    let arr = [];
    if (myBooks.length <= 5) {
      return;
    }
    const numIterations = Math.min(myBooks.length - 5, 5);
    for (let i = 5; i < 5 + numIterations; i++) {
      arr.push(
        <Col
          className={styles.box}
          onClick={() => myBookDetail(myBooks[i].myBookDTO.id)}
          key={myBooks[i].myBookDTO.id}
        >
          {myBooks[i].myBookDTO.myBookStatus === "읽은 책" ? (
            <Badge className="text-uppercase mb-2" color="primary" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}
          {myBooks[i].myBookDTO.myBookStatus === "읽는 중인 책" ? (
            <Badge className="text-uppercase mb-2" color="warning" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}
          {myBooks[i].myBookDTO.myBookStatus === "읽고 싶은 책" ? (
            <Badge className="text-uppercase mb-2" color="danger" pill>
              {myBooks[i].myBookDTO.myBookStatus}
            </Badge>
          ) : (
            ""
          )}

          <img
            className={styles.bookImage}
            src={myBooks[i].bookDTO.imageUrl}
            alt="bookImage"
          ></img>
          <p className={styles.title}>{myBooks[i].bookDTO.bookName}</p>
        </Col>
      );
    }
    for (let i = 5 - numIterations; i > 0; i--) {
      arr.push(<Col key={`${i}2`}></Col>);
    }
    return arr;
  };

  //페이징
  const onClickPage = (index) => {
    setCurrentPage(index);
  };
  const renderPageButtons = () => {
    let arr = [];
    const btnLimit = 5;
    const startBtn = Math.max(1, currentPage - Math.floor(btnLimit / 2));
    const endBtn = Math.min(totalPage, startBtn + btnLimit - 1);
    for (let i = startBtn; i <= endBtn; i++) {
      arr.push(
        <PaginationItem
          key={i}
          className={currentPage === i - 1 ? "active" : ""}
        >
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
              onClickPage(i - 1);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return arr;
  };

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
              <Row className="mt-3">{repeatMyBooks(myBooks)}</Row>
              <Row className="mt-3 mb-3">{repeatMyBooks2(myBooks)}</Row>
            </div>
          ) : (
            <div className="text-center m-5">
              내 서재에 담긴 책이 존재하지 않습니다.
            </div>
          )}

          <Pagination className="m-auto">
            <PaginationItem
              style={{ display: currentPage === 0 ? "none" : "block" }}
            >
              <PaginationLink
                onClick={(e) => {
                  if (currentPage > 0) onClickPage(currentPage - 1);
                }}
              >
                <i className="fa fa-angle-left" />
              </PaginationLink>
            </PaginationItem>
            {renderPageButtons()}
            <PaginationItem
              style={{
                display: currentPage === totalPage - 1 ? "none" : "block",
              }}
            >
              <PaginationLink
                onClick={(e) => {
                  if (currentPage < totalPage - 1) onClickPage(currentPage + 1);
                }}
              >
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
