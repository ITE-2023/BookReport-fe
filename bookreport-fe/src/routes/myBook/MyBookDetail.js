import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import { Card, Col, Container, Row } from "reactstrap";
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

  const findMyBook = (id) => {
    customAxios
      .myBook_detail(id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.bookDTO);
          setIsbn(res.data.bookDTO.isbn);
          setTitle(res.data.bookDTO.bookName);
          setImage(res.data.bookDTO.imageUrl);
          setAuthor(res.data.bookDTO.author);
          setPublisher(res.data.bookDTO.publisher);
          setDescription(res.data.bookDTO.description);
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
  const descriptionLimit = useRef(200);
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

  return (
    <Layout>
      <Hero>
        <Container className="mt-5">
          <Card className={styles.bookDetailBox}>
            <Row className="align-items-top">
              <Col className="text-center">
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
                <div className="mb-3 text-center">
                  <span>수정</span>&nbsp;/&nbsp;<span>삭제</span>
                </div>
                <p>평가 : ⭐⭐⭐⭐⭐</p>
                <p>시작일 : 2023-09-20 </p>
                <p>종료일 : 2023-09-25</p>
                <p>독서량 : 100쪽</p>
                <p>시작일 : 2023-09-20 </p>
                <p>기대평 : 기대기대기대평 </p>
              </Col>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default MyBookDetail;
