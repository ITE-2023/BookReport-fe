import {
  Button,
  Card,
  Col,
  Container,
  Row,
  CardBody,
  Modal,
  NavItem,
  NavLink,
  Nav,
  CardHeader,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import styles from "../../css/BookDetail.module.css";
import { useMemo, useRef, useState, useEffect } from "react";
import classnames from "classnames";
import { customAxios } from "../../api/customAxios.js";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { isbn } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");

  // 책 상세 검색
  const search_detail = async (isbn) => {
    await customAxios
      .search_detail(isbn)
      .then((res) => {
        if (res.status === 200) {
          setTitle(res.data.title);
          setAuthor(res.data.author);
          setPublisher(res.data.publisher);
          setDescription(res.data.description);
          setImage(res.data.image);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    search_detail(isbn);
  }, [isbn]);

  // 책 소개글 더보기
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

  // 내 서재 버튼 클릭 시, modal 작동
  const [formModal, setFormModal] = useState(false);
  const toggleModal = () => {
    setFormModal(!formModal);
  };

  return (
    <Layout>
      <Hero>
        <Container className="mt-5">
          <Card className={styles.bookDetailBox}>
            <Row className="align-items-top">
              <Col>
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
                  {publisher} (출판사)
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
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={toggleModal}
                >
                  <span className="btn-inner--icon">
                    <i
                      className={`${styles.icon} fa fa-plus-square mr-2 fa-lg`}
                      aria-hidden="true"
                    />
                  </span>
                  내 서재 추가
                </Button>
                <Modal
                  className="modal-dialog-centered"
                  size="sm"
                  isOpen={formModal}
                  toggle={toggleModal}
                ></Modal>
              </Col>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default BookDetail;
