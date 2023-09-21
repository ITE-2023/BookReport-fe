import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import {
  Card,
  Col,
  Modal,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Badge,
  Button,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import styles from "../../css/BookDetail.module.css";
import { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDatetime from "react-datetime";
import classnames from "classnames";
import { customAxios } from "../../api/customAxios.js";
import { Rating } from "react-simple-star-rating";
import { icon, MixinToast } from "../../components/Alert.js";

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

  // 수정 버튼
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
  const handleRating = (rate: number) => {
    setRate(rate);
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
    } else if (
      who === "endDate" &&
      (!state.startDate || date > state.startDate)
    ) {
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

  // 읽는 중인 경우
  const changeReadingStartDate = (date) => {
    setReadingStartDate(date);
  };

  const changeReadingPage = (e) => {
    setReadPage(e.target.value);
  };

  // 읽고 싶은 경우
  const changeExpect = (e) => {
    setExpectation(e.target.value);
  };

  const onUpdate = () => {
    if (pill === 1) {
      if (rate === 0 || state.startDate === null || state.endDate === null) {
        MixinToast({ icon: icon.ERROR, title: "모든 칸을 입력해주세요." });
        return;
      }
    } else if (pill === 2) {
      if (readPage === 0 || readingStartDate === null) {
        MixinToast({ icon: icon.ERROR, title: "모든 칸을 입력해주세요." });
        return;
      }
    }
    function getPillStatus(pill) {
      switch (pill) {
        case 1:
          return "읽은 책";
        case 2:
          return "읽는 중인 책";
        case 3:
          return "읽고 싶은 책";
        default:
          return "읽은 책";
      }
    }

    const myBookRequest = {
      myBookStatus: getPillStatus(pill),
      rate: rate,
      startDate: state.startDate,
      endDate: state.endDate,
      readPage: readPage,
      readingStartDate: readingStartDate,
      expectation: expectation,
    };

    customAxios
      .myBook_update(id, myBookRequest)
      .then((res) => {
        if (res.status === 200) {
          setMyBookStatus(res.data.myBookStatus);
          setRate(res.data.rate);
          setStartDate(res.data.startDate);
          setEndDate(res.data.endDate);
          setReadPage(res.data.readPage);
          setReadingStartDate(res.data.readingStartDate);
          setExpectation(res.data.expectation);
          setFormModal(!formModal);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              <Col className="border-left">
                <div className="text-left mb-4">
                  <Button
                    className="btn-white"
                    color="default"
                    size="sm"
                    onClick={toggleModal}
                  >
                    <span className="btn-inner--text">&nbsp;수정&nbsp;</span>
                  </Button>
                  <Button className="btn-white" color="default" size="sm">
                    <span className="btn-inner--text">&nbsp;삭제&nbsp;</span>
                  </Button>
                </div>
                {myBookStatus === "읽은 책" ? (
                  <div>
                    <h6 className="font-weight-bold">평가</h6>
                    <p>{repeatRate()}</p>
                    <h6 className="font-weight-bold">시작일</h6>
                    <p>{startDate.substring(0, 10)}</p>
                    <h6 className="font-weight-bold">종료일</h6>
                    <p>{endDate.substring(0, 10)}</p>
                  </div>
                ) : (
                  ""
                )}
                {myBookStatus === "읽는 중인 책" ? (
                  <div>
                    <h6 className="font-weight-bold">독서량</h6>
                    <p>{readPage}쪽</p>
                    <h6 className="font-weight-bold">시작일</h6>
                    <p>{readingStartDate.substring(0, 10)} </p>
                  </div>
                ) : (
                  ""
                )}
                {myBookStatus === "읽고 싶은 책" ? (
                  <div>
                    <h6 className="font-weight-bold">기대평</h6>
                    <p>{expectation}</p>
                  </div>
                ) : (
                  ""
                )}
              </Col>
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
                                      handleReactDatetimeChange("startDate", e)
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
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-bookmark-o" />
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;읽은 페이지
                                      :
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    type="number"
                                    onChange={changeReadingPage}
                                  />
                                  <InputGroupText>쪽</InputGroupText>
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
                                      placeholder: "시작일",
                                    }}
                                    timeFormat={false}
                                    value={readingStartDate}
                                    onChange={(e) => changeReadingStartDate(e)}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </TabPane>
                            <TabPane tabId="iconTabs3">
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-heart-o" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    placeholder="기대평"
                                    type="text"
                                    onChange={(e) => changeExpect(e)}
                                    maxlength="70"
                                  />
                                </InputGroup>
                              </FormGroup>
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
                          onClick={onUpdate}
                        >
                          수정하기
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </Modal>
            </Row>
          </Card>
        </Container>
      </Hero>
    </Layout>
  );
}

export default MyBookDetail;
