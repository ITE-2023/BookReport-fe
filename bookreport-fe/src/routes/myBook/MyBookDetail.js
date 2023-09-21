import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import { Card, Col, Container, Row, Badge, Button } from "reactstrap";
import styles from "../../css/BookDetail.module.css";
import { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import { customAxios } from "../../api/customAxios.js";

function MyBookDetail() {
  const { id } = useParams();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");

  const [myBookStatus, setMyBookStatus] = useState("");
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [readPage, setReadPage] = useState(0);
  const [readingStartDate, setReadingStartDate] = useState(null);
  const [expectation, setExpectation] = useState("");

  const findMyBook = (id) => {
    customAxios
      .myBook_detail(id)
      .then((res) => {
        if (res.status === 200) {
          setIsbn(res.data.bookDTO.isbn);
          setTitle(res.data.bookDTO.bookName);
          setImage(res.data.bookDTO.imageUrl);
          setAuthor(res.data.bookDTO.author);
          setPublisher(res.data.bookDTO.publisher);
          setDescription(res.data.bookDTO.description);

          setMyBookStatus(res.data.myBookDTO.myBookStatus);
          setRate(res.data.myBookDTO.rate);
          setStartDate(res.data.myBookDTO.startDate);
          setEndDate(res.data.myBookDTO.endDate);
          setReadPage(res.data.myBookDTO.readPage);
          setReadingStartDate(res.data.myBookDTO.readingStartDate);
          setExpectation(res.data.myBookDTO.expectation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    findMyBook(id);
  }, [id]);

  const [isMore, setIsMore] = useState(false);
  const descriptionLimit = useRef(145);
  const commenter = useMemo(() => {
    const shortDescription = description.slice(0, descriptionLimit.current);

    if (description.length > descriptionLimit.current) {
      if (isMore) {
        return description;
      }
      return shortDescription + "...";
    }
    return description;
  }, [isMore, description]);

  const repeatRate = () => {
    let arr = [];
    for (let i = 0; i < rate; i++) {
      arr.push(<span>⭐</span>);
    }
    return arr;
  };

  return (
    <Layout>
      <Hero>
        <Container className="mt-5">
          <Card className={styles.bookDetailBox}>
            <Row className="align-items-top">
              <Col className="text-center mt-3">
                {myBookStatus === "읽은 책" ? (
                  <Badge className="text-uppercase mb-3" color="primary" pill>
                    {myBookStatus}
                  </Badge>
                ) : (
                  ""
                )}
                {myBookStatus === "읽는 중인 책" ? (
                  <Badge className="text-uppercase mb-3" color="info" pill>
                    {myBookStatus}
                  </Badge>
                ) : (
                  ""
                )}
                {myBookStatus === "읽고 싶은 책" ? (
                  <Badge className="text-uppercase mb-3" color="danger" pill>
                    {myBookStatus}
                  </Badge>
                ) : (
                  ""
                )}
                <img
                  className={styles.bookImage}
                  src={image}
                  alt="bookImage"
                ></img>
              </Col>
              <Col className={styles.bookDetail} sm="7">
                <p>
                  <span className={styles.bookTitle}>{title}</span>
                  <span className="text-muted"> ({isbn})</span>
                </p>
                <p className="text-muted">
                  {author} &nbsp;&nbsp;&nbsp;&nbsp; || &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {publisher}
                </p>
                <br />
                <h6 className="font-weight-bold text-muted">책 소개</h6>
                <p>{commenter}</p>
                <div
                  onClick={() => setIsMore(!isMore)}
                  className={`text-muted ${styles.moreBtn}`}
                >
                  {description.length > descriptionLimit.current &&
                    (isMore ? "[접기]" : "[더보기]")}
                </div>
              </Col>
              <Col>
                <div className="text-left mb-3">
                  <Button className="btn-white" color="default" size="sm">
                    <span className="btn-inner--text">&nbsp;수정&nbsp;</span>
                  </Button>
                  <Button className="btn-white" color="default" size="sm">
                    <span className="btn-inner--text">&nbsp;삭제&nbsp;</span>
                  </Button>
                </div>
                {myBookStatus === "읽은 책" ? (
                  <div>
                    <p>평가 : {repeatRate()}</p>
                    <p>시작일 : {startDate.substring(0, 10)}</p>
                    <p>종료일 : {endDate.substring(0, 10)}</p>
                  </div>
                ) : (
                  ""
                )}
                {myBookStatus === "읽는 중인 책" ? (
                  <div>
                    <p>독서량 : {readPage}쪽</p>
                    <p>시작일 : {readingStartDate.substring(0, 10)} </p>
                  </div>
                ) : (
                  ""
                )}
                {myBookStatus === "읽고 싶은 책" ? (
                  <div>
                    <p>기대평 : {expectation}</p>
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default MyBookDetail;
