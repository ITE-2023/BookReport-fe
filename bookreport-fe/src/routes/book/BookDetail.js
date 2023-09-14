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
  TabContent,
  TabPane,
  FormGroup,
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
import { Rating } from "react-simple-star-rating";
import ReactDatetime from "react-datetime";
import { icon, MixinToast } from "../../components/Alert.js";

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
  const [pill, setPill] = useState(1);
  const toggleNavs = (index) => {
    setPill(index);
  };

  // star rating
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // date picker
  const [state, setState] = useState({
    startDate: null,
    endDate: null,
  });
  const handleReactDatetimeChange = (who, date) => {
    if (who === "startDate" && (!state.endDate || date < state.endDate)) {
      setState({
        startDate: date,
        endDate: state.endDate,
      });
    } else if (who === "endDate" && (!state.startDate || date > state.startDate)) {
      setState({
        startDate: state.startDate,
        endDate: date,
      });
    } else {
      setState({
        startDate: date,
        endDate: date,
      });
    }
  };

  const getClassNameReactDatetimeDays = (date) => {
    if (state.startDate && state.endDate) {
      if (date >= state.startDate && date <= state.endDate) {
        return "selected-date";
      }
    } else if (state.startDate && date === state.startDate) {
      return "start-date";
    } else if (state.endDate && date === state.endDate) {
      return "end-date";
    }
  
    return "";
  };

  // 내 서재에 담기 실행
  const onClick = () => {
    const bookRequest = {
      isbn: isbn,
      bookName: title,
      author: author,
      publisher: publisher,
      description: description,
      image: image,
    };

    const myBookRequest = {
      myBookStatus: pill,
      rate: rating,
      startDate: state.startDate,
      endDate: state.endDate,
    };

    const myBookVO = {
      bookRequest: bookRequest,
      myBookRequest: myBookRequest,
    };

    customAxios.myBook_save(myBookVO).then((res) => {
      if (res.status === 200) {
        MixinToast({ icon: icon.SUCCESS, title: "내 서재에 담았어요!" });
      }
    });
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
                        <div className="nav-wrapper">
                          <Nav
                            className="nav-fill flex-column flex-md-row"
                            id="tabs-icons-text"
                            pills
                            role="tablist"
                          >
                            <NavItem>
                              <NavLink
                                aria-selected={pill === 1}
                                className={classnames("mb-sm-3 mb-md-0", {
                                  active: pill === 1,
                                })}
                                onClick={(e) => toggleNavs(1)}
                                href="#pablo"
                                role="tab"
                              >
                                <i className="fa fa-check-circle mr-2" />
                                읽은 책
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                aria-selected={pill === 2}
                                className={classnames("mb-sm-3 mb-md-0", {
                                  active: pill === 2,
                                })}
                                onClick={(e) => toggleNavs(2)}
                                href="#pablo"
                                role="tab"
                              >
                                <i className="fa fa-bookmark mr-2" />
                                읽는 중인 책
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                aria-selected={pill === 3}
                                className={classnames("mb-sm-3 mb-md-0", {
                                  active: pill === 3,
                                })}
                                onClick={(e) => toggleNavs(3)}
                                href="#pablo"
                                role="tab"
                              >
                                <i className="fa fa-star mr-2" />
                                읽고 싶은 책
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </div>
                        <Card className="shadow">
                          <CardBody>
                            <TabContent activeTab={"iconTabs" + pill}>
                              <TabPane tabId="iconTabs1">
                                <span>평점 </span>
                                <Rating onClick={handleRating} />
                                <p></p>
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-calendar-grid-58" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetime
                                      inputProps={{
                                        placeholder: "시작일",
                                      }}
                                      value={state.startDate}
                                      timeFormat={false}
                                      onChange={(e) =>
                                        handleReactDatetimeChange(
                                          "startDate",
                                          e
                                        )
                                      }
                                      renderDay={(
                                        props,
                                        currentDate,
                                        selectedDate
                                      ) => {
                                        let classes = props.className;
                                        classes +=
                                          getClassNameReactDatetimeDays(
                                            currentDate
                                          );
                                        return (
                                          <td {...props} className={classes}>
                                            {currentDate.date()}
                                          </td>
                                        );
                                      }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="ni ni-calendar-grid-58" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetime
                                      inputProps={{
                                        placeholder: "종료일",
                                      }}
                                      className="rdtPickerOnRight"
                                      value={state.endDate}
                                      timeFormat={false}
                                      onChange={(e) =>
                                        handleReactDatetimeChange("endDate", e)
                                      }
                                      renderDay={(
                                        props,
                                        currentDate,
                                        selectedDate
                                      ) => {
                                        let classes = props.className;
                                        classes +=
                                          getClassNameReactDatetimeDays(
                                            currentDate
                                          );
                                        return (
                                          <td {...props} className={classes}>
                                            {currentDate.date()}
                                          </td>
                                        );
                                      }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </TabPane>
                              <TabPane tabId="iconTabs2">
                                <p className="description">
                                  Cosby sweater eu banh mi, qui irure terry
                                  richardson ex squid. Aliquip placeat salvia
                                  cillum iphone. Seitan aliquip quis cardigan
                                  american apparel, butcher voluptate nisi qui.
                                </p>
                              </TabPane>
                              <TabPane tabId="iconTabs3">
                                <p className="description">
                                  Raw denim you probably haven't heard of them
                                  jean shorts Austin. Nesciunt tofu stumptown
                                  aliqua, retro synth master cleanse. Mustache
                                  cliche tempor, williamsburg carles vegan
                                  helvetica. Reprehenderit butcher retro
                                  keffiyeh dreamcatcher synth.
                                </p>
                              </TabPane>
                            </TabContent>
                          </CardBody>
                        </Card>
                        <div className="text-center mt-4">
                          <Button
                            className="btn-1"
                            color="primary"
                            outline
                            type="button"
                            onClick={onClick}
                          >
                            저장하기
                          </Button>
                        </div>
                      </CardHeader>
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
