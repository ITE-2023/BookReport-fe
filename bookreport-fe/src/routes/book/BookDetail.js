import { Button, Card, Col, Container, Row } from "reactstrap";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import { useLocation } from "react-router-dom";
import styles from "../../css/BookDetail.module.css";
import { useMemo, useRef, useState } from "react";

function BookDetail() {
  const location = useLocation();
  const book = location.state.book;
  const [isMore, setIsMore] = useState(false);
  const descriptionLimit = useRef(200);
  const commenter = useMemo(() => {
    const shortDescription = book.description.slice(
      0,
      descriptionLimit.current
    );

    if (book.description.length > descriptionLimit.current) {
      if (isMore) {
        return book.description;
      }
      return shortDescription + "...";
    }
    return book.description;
  }, [isMore, book.description]);

  return (
    <Layout>
      <Hero>
        <Container className="mt-5">
          <Card className={styles.bookDetailBox}>
            <Row className="align-items-top">
              <Col>
                <img
                  className={styles.bookImage}
                  src={book.image}
                  alt="bookImage"
                ></img>
              </Col>
              <Col className={styles.bookDetail} sm="7">
                <p>
                  <span className={styles.bookTitle}>{book.title}</span>
                  <span className="text-muted"> ({book.isbn})</span>
                </p>
                <p className="text-muted">
                  {book.author} &nbsp;&nbsp;&nbsp;&nbsp; ||
                  &nbsp;&nbsp;&nbsp;&nbsp; {book.publisher} (출판사)
                </p>
                <br />
                <h6 className="font-weight-bold text-muted">책 소개</h6>
                <p>{commenter}</p>
                <div onClick={() => setIsMore(!isMore)} className="text-muted">
                  {book.description.length > descriptionLimit.current &&
                    (isMore ? "[접기]" : "[더보기]")}
                </div>
              </Col>
              <Col>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i
                      className={`${styles.icon} fa fa-plus-square mr-2 fa-lg`}
                      aria-hidden="true"
                    />
                  </span>
                  내 서재 추가
                </Button>
              </Col>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default BookDetail;
