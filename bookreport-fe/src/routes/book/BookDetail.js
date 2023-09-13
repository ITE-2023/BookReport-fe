import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  NavItem,
  NavLink,
  Nav,
  CardHeader,
  CardBody,
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

  // 책 상태 선택 버튼
  const [pill, setPill] = useState(0);
  const toggleNavs = (index) => {
    setPill(index);
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
                  isOpen={formModal}
                  toggle={toggleModal}
                >
                  <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="btn-wrapper text-center">
                          <Col>
                            <Nav pills className="justify-content-center">
                              <NavItem>
                                <NavLink
                                  aria-selected={pill === 1}
                                  className={classnames(
                                    "btn-1",
                                    {
                                      active: pill === 1,
                                    },
                                    styles.navLink
                                  )}
                                  onClick={(index) => toggleNavs(1)}
                                  color="primary"
                                  outline
                                  type="button"
                                >
                                  <span className="nav-link-icon d-block">
                                    <i className="fa fa-check-circle" />
                                  </span>
                                  읽은 책
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={pill === 2}
                                  className={classnames(
                                    "btn-1",
                                    {
                                      active: pill === 2,
                                    },
                                    styles.navLink
                                  )}
                                  onClick={(index) => toggleNavs(2)}
                                  color="primary"
                                  outline
                                  type="button"
                                >
                                  <span className="nav-link-icon d-block">
                                    <i className="fa fa-bookmark" />
                                  </span>
                                  읽는 중인 책
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={pill === 3}
                                  className={classnames(
                                    "btn-1",
                                    {
                                      active: pill === 3,
                                    },
                                    styles.navLink
                                  )}
                                  onClick={(index) => toggleNavs(3)}
                                  color="primary"
                                  outline
                                  type="button"
                                >
                                  <span className="nav-link-icon d-block">
                                    <i className="fa fa-star" />
                                  </span>
                                  읽고 싶은 책
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </Col>
                        </div>
                      </CardHeader>
                      <CardBody></CardBody>
                    </Card>
                  </div>
                </Modal>
              </Col>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default BookDetail;
