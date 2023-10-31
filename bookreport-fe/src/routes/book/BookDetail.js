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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import styles from "../../css/BookDetail.module.css";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import { customAxios } from "../../api/customAxios.js";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import ReactDatetime from "react-datetime";
import { icon, MixinToast, TimerToast } from "../../components/Alert.js";
import { getCookie } from "../../api/cookie.js";
import { useNavigate } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";

function BookDetail() {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const { isbn } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");

  const [myBookBtn, setMyBookBtn] = useState(false);
  const [myBookId, setMyBookId] = useState();

  const [totalPage, setTotalPage] = useState();
  const [reportList, setReportList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [surprised, setSurprised] = useState(0);
  const [anger, setAnger] = useState(0);
  const [scary, setScary] = useState(0);
  const [emotionData, setEmotionData] = useState([
    {
      emotion: "행복",
      행복: 0,
    },
    {
      emotion: "슬픔",
      슬픔: 0,
    },
    {
      emotion: "놀람",
      놀람: 0,
    },
    {
      emotion: "공포",
      공포: 0,
    },
    {
      emotion: "분노",
      분노: 0,
    },
  ]);

  // 책 상세 검색
  const search_detail = useCallback(() => {
    customAxios
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
        console.error(error.response.data);
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
        navigate(-1);
      });
  }, [isbn, navigate]);

  // 책 별 독후감 조회
  const findReports = useCallback(() => {
    customAxios
      .reports(isbn, currentPage)
      .then((res) => {
        if (res.status === 200) {
          setReportList(res.data.reportList);
          setTotalPage(res.data.totalPage);
        }
      })
      .catch((error) => {
        setReportList([]);
      });
  }, [isbn, currentPage]);

  const repeatReport = (reportList) => {
    let arr = [];
    for (let i = 0; i < reportList.length; i++) {
      arr.push(
        <a
          className="text-decoration-none text-dark"
          href={`/report/detail/${reportList[i].id}`}
          key={reportList[i].id}
        >
          <Row className="text-center mb-3">
            <Col sm="1">{i + 1 + currentPage * 10}</Col>
            <Col sm="6" className="text-left">
              {reportList[i].title}
            </Col>
            <Col>{reportList[i].username}</Col>
            <Col>{reportList[i].createDate.substring(0, 10)}</Col>
          </Row>
        </a>
      );
    }
    return arr;
  };

  // 페이징
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

  // 감정
  const getEmotion = useCallback(() => {
    customAxios
      .emotion(isbn)
      .then((res) => {
        if (res.status === 200) {
          setHappy(res.data.happy);
          setAnger(res.data.anger);
          setSad(res.data.sad);
          setScary(res.data.scary);
          setSurprised(res.data.surprised);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isbn]);

  useEffect(() => {
    setToken(getCookie("accessToken"));
    // 회원이 이미 서재에 책을 담았는지 확인
    const checkMyBook = async (isbn) => {
      if (token) {
        await customAxios.myBook_check(isbn).then((res) => {
          if (res.status === 200) {
            setMyBookBtn(res.data.check);
            setMyBookId(res.data.myBookId);
          }
        });
      }
    };

    search_detail(isbn);
    checkMyBook(isbn);
    findReports(isbn, currentPage);
    getEmotion(isbn);
  }, [isbn, token, currentPage, search_detail, findReports, getEmotion]);

  useEffect(() => {
    const total = happy + sad + surprised + anger + scary;
    const happyPercentage = (happy / total) * 100;
    const sadPercentage = (sad / total) * 100;
    const surprisedPercentage = (surprised / total) * 100;
    const angerPercentage = (anger / total) * 100;
    const scaryPercentage = (scary / total) * 100;

    setEmotionData([
      {
        emotion: "행복",
        행복: happyPercentage.toFixed(1),
      },
      {
        emotion: "슬픔",
        슬픔: sadPercentage.toFixed(1),
      },
      {
        emotion: "놀람",
        놀람: surprisedPercentage.toFixed(1),
      },
      {
        emotion: "공포",
        공포: scaryPercentage.toFixed(1),
      },
      {
        emotion: "분노",
        분노: angerPercentage.toFixed(1),
      },
    ]);
  }, [happy, sad, surprised, scary, anger]);

  // 책 소개글 더보기
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

  // 내 서재 버튼 클릭 시, modal 작동
  const [formModal, setFormModal] = useState(false);
  const toggleModal = () => {
    if (!token) {
      navigate(`/member/login`);
    }
    setFormModal(!formModal);
  };

  // 책 상태 선택 버튼
  const [pill, setPill] = useState(1);
  const toggleNavs = (index) => {
    setPill(index);
  };

  // star rating
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
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
  const [readingPage, setReadingPage] = useState(0);
  const [readingStartDate, setReadingStartDate] = useState(null);
  const changeReadingStartDate = (date) => {
    setReadingStartDate(date);
  };

  const changeReadingPage = (e) => {
    setReadingPage(e.target.value);
  };

  // 읽고 싶은 경우
  const [expect, setExpect] = useState(null);
  const changeExpect = (e) => {
    setExpect(e.target.value);
  };

  // 내 서재에 담기 실행
  const onClick = () => {
    if (pill === 1) {
      if (rating === 0 || state.startDate === null || state.endDate === null) {
        MixinToast({ icon: icon.ERROR, title: "모든 칸을 입력해주세요." });
        return;
      }
    } else if (pill === 2) {
      if (readingPage === 0 || readingStartDate === null) {
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

    const bookRequest = {
      isbn: isbn,
      bookName: title,
      author: author,
      publisher: publisher,
      description: description,
      imageUrl: image,
    };

    const myBookRequest = {
      myBookStatus: getPillStatus(pill),
      rate: rating,
      startDate: state.startDate
        ? state.startDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      endDate: state.endDate
        ? state.endDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      readPage: readingPage,
      readingStartDate: readingStartDate
        ? readingStartDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      expectation: expect,
    };

    const myBookVO = {
      bookRequest: bookRequest,
      myBookRequest: myBookRequest,
    };

    customAxios
      .myBook_save(myBookVO)
      .then((res) => {
        if (res.status === 200) {
          MixinToast({ icon: icon.SUCCESS, title: "내 서재에 담았어요!" });
          navigate(`/myBook/detail/${res.data.id}`);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
      });
  };

  return (
    <Layout>
      <Hero>
        <Container className="mt-5">
          <Card className={styles.bookDetailBox}>
            <Row className="align-items-top">
              <Col className="mt-3">
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
                {emotionData[0]["행복"] !== "NaN" ? (
                  <div className={styles.emotion}>
                    <ResponsiveBar
                      data={emotionData}
                      keys={["행복", "슬픔", "놀람", "공포", "분노"]}
                      indexBy="emotion"
                      margin={{ top: 15, right: 130, bottom: 50, left: -10 }}
                      padding={0.3}
                      valueScale={{ type: "linear" }}
                      indexScale={{ type: "band", round: true }}
                      borderRadius={6}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                      }}
                      colors={[
                        "#FEBBCC",
                        "#AEDEFC",
                        "#FFCF96",
                        "#D0BFFF",
                        "#FF8989",
                      ]}
                      theme={{
                        labels: {
                          text: {
                            fontSize: 13,
                          },
                        },
                        legends: {
                          text: {
                            fontSize: 13,
                          },
                        },
                        axis: {
                          ticks: {
                            text: {
                              fontSize: 13,
                            },
                          },
                        },
                      }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendPosition: "middle",
                        legendOffset: 32,
                      }}
                      axisLeft={null}
                      enableGridY={false}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 3]],
                      }}
                      legends={[
                        {
                          dataFrom: "keys",
                          anchor: "bottom-right",
                          direction: "column",
                          justify: false,
                          translateX: 120,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemWidth: 100,
                          itemHeight: 20,
                          itemDirection: "left-to-right",
                          itemOpacity: 0.85,
                          symbolSize: 20,
                          text: { fontSize: 20 },
                          effects: [
                            {
                              on: "hover",
                              style: {
                                itemOpacity: 1,
                              },
                            },
                          ],
                        },
                      ]}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </Col>
              <Col>
                {!myBookBtn ? (
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
                ) : (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href={`/myBook/detail/${myBookId}`}
                  >
                    <span className="btn-inner--icon">
                      <i
                        className={`${styles.icon} fa fa-arrow-right mr-2 fa-lg`}
                        aria-hidden="true"
                      />
                    </span>
                    내 서재로 이동
                  </Button>
                )}

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
                                <FormGroup>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="fa fa-bookmark-o" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;읽은
                                        페이지 :
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
                                      onChange={(e) =>
                                        changeReadingStartDate(e)
                                      }
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
                                      maxLength="70"
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
      <div className="pb-5">
        <Container>
          <Card className="shadow p-4">
            <Row className="text-center text-muted">
              <Col sm="1">번호</Col>
              <Col sm="6">제목</Col>
              <Col>작성자</Col>
              <Col>작성일</Col>
            </Row>
            <hr className="m-3" />
            {reportList.length !== 0 ? (
              repeatReport(reportList)
            ) : (
              <div className="text-center">
                등록된 독후감이 존재하지 않습니다.
              </div>
            )}
            <br />
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
                    if (currentPage < totalPage - 1)
                      onClickPage(currentPage + 1);
                  }}
                >
                  <i className="fa fa-angle-right" />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Card>
        </Container>
      </div>
    </Layout>
  );
}

export default BookDetail;
