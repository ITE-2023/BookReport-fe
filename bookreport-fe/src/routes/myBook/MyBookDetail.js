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
import styles from "../../css/MyBookDetail.module.css";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactDatetime from "react-datetime";
import classnames from "classnames";
import { customAxios } from "../../api/customAxios.js";
import { Rating } from "react-simple-star-rating";
import {
  icon,
  MixinToast,
  ConfirmToast,
  TimerToast,
} from "../../components/Alert.js";
import { useNavigate } from "react-router-dom";
import "../../css/Alert.css";
import { ScaleLoader } from "react-spinners";
import { Smile } from "@emotion-icons/fa-regular/Smile";
import { SadTear } from "@emotion-icons/fa-regular/SadTear";
import { Surprise } from "@emotion-icons/fa-regular/Surprise";
import { Tired } from "@emotion-icons/fa-regular/Tired";
import { Angry } from "@emotion-icons/fa-regular/Angry";

function MyBookDetail() {
  const navigate = useNavigate();

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

  const [updateRate, setUpdateRate] = useState(0);
  const [updateStartDate, setUpdateStartDate] = useState(null);
  const [updateEndDate, setUpdateEndDate] = useState(null);
  const [updateReadPage, setUpdateReadPage] = useState(0);
  const [updateReadingStartDate, setUpdateReadingStartDate] = useState(null);
  const [updateExpectation, setUpdateExpectation] = useState("");

  const [reportId, setReportId] = useState();
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportEmotionType, setReportEmotionType] = useState("");
  const [updateReportTitle, setUpdateReportTitle] = useState("");
  const [updateReportContent, setUpdateReportContent] = useState("");

  const findMyBook = useCallback(() => {
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
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
        navigate("/myBooks");
      });
  }, [id, navigate]);

  // 독후감 조회
  const findReport = useCallback(() => {
    customAxios
      .report_by_mybook(id)
      .then((res) => {
        if (res.status === 200 && res.data.length !== 0) {
          setReportId(res.data.id);
          setReportTitle(res.data.title);
          setReportContent(res.data.content);
          setReportEmotionType(res.data.emotionType);
          setUpdateReportTitle(res.data.title);
          setUpdateReportContent(res.data.content);
        }
      })
      .catch((error) => {
        console.log(error);
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
        navigate("/myBooks");
      });
  }, [id, navigate]);

  useEffect(() => {
    findMyBook(id);
    findReport(id);
  }, [id, findMyBook, findReport]);

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
      arr.push(<span key={i}>⭐</span>);
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
  const handleRating = (rate) => {
    setUpdateRate(rate);
  };

  // date picker

  const handleReactDatetimeChange = (who, date) => {
    if (who === "startDate" && (!updateEndDate || date < updateEndDate)) {
      setUpdateStartDate(date);
      setUpdateEndDate(updateEndDate);
    } else if (
      who === "endDate" &&
      (!updateStartDate || date > updateStartDate)
    ) {
      setUpdateStartDate(updateStartDate);
      setUpdateEndDate(date);
    } else {
      setUpdateStartDate(date);
      setUpdateEndDate(date);
    }
  };

  const getClassNameReactDatetimeDays = (date) => {
    if (updateStartDate && updateEndDate) {
      if (date >= updateStartDate && date <= updateEndDate) {
        return "selected-date";
      }
    } else if (updateStartDate && date === updateStartDate) {
      return "start-date";
    } else if (updateEndDate && date === updateEndDate) {
      return "end-date";
    }

    return "";
  };

  // 읽는 중인 경우
  const changeReadingStartDate = (date) => {
    setUpdateReadingStartDate(date);
  };

  const changeReadingPage = (e) => {
    setUpdateReadPage(e.target.value);
  };

  // 읽고 싶은 경우
  const changeExpect = (e) => {
    setUpdateExpectation(e.target.value);
  };

  // 수정
  const onUpdate = () => {
    if (pill === 1) {
      if (
        updateRate === 0 ||
        updateStartDate === null ||
        updateEndDate === null
      ) {
        MixinToast({ icon: icon.ERROR, title: "모든 칸을 입력해주세요." });
        return;
      }
    } else if (pill === 2) {
      if (updateReadPage === 0 || updateReadingStartDate === null) {
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
      rate: updateRate,
      startDate: updateStartDate
        ? updateStartDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      endDate: updateEndDate
        ? updateEndDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      readPage: updateReadPage,
      readingStartDate: updateReadingStartDate
        ? updateReadingStartDate.format("YYYY-MM-DDTHH:mm:sszz")
        : null,
      expectation: updateExpectation,
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
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
        navigate("/myBooks");
      });
  };

  //삭제
  const onDelete = () => {
    ConfirmToast({
      title: "책 삭제",
      text: "책을 서재에서 삭제하시겠습니까?",
      icon: icon.question,
      confirmText: "네",
      confirmTitle: "책 삭제",
      confirmContent: "삭제 처리 되었습니다.",
    })
      .then((confirm) => {
        if (confirm) {
          customAxios
            .myBook_delete(id)
            .then((res) => {
              if (res === 200) {
                console.log("deleted");
              }
            })
            .catch((error) => {
              console.log(error);
              TimerToast({
                title: error.response.data,
                icon: icon.ERROR,
              });
              navigate("/myBooks");
            });
          window.location.href = "/myBooks";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 독후감 작성
  const [formWriteModal, setFormWriteModal] = useState(false);
  const toggleWriteModal = () => {
    setFormWriteModal(!formWriteModal);
  };

  const changeReportTitle = (e) => {
    setUpdateReportTitle(e.target.value);
  };

  const changeReportContent = (e) => {
    setUpdateReportContent(e.target.value);
  };

  const onReportSave = () => {
    if (updateReportTitle.length === 0) {
      MixinToast({ icon: icon.ERROR, title: "제목을 입력해주세요." });
      return;
    } else if (updateReportContent.length === 0) {
      MixinToast({ icon: icon.ERROR, title: "내용을 입력해주세요." });
      return;
    }
    const reportRequest = {
      title: updateReportTitle,
      content: updateReportContent,
    };
    if (reportId === undefined) {
      customAxios
        .report_save(id, reportRequest)
        .then((res) => {
          if (res.status === 200) {
            setReportTitle(res.data.title);
            setReportContent(res.data.content);
            setFormWriteModal(!formWriteModal);
          }
        })
        .catch((error) => {
          console.log(error);
          TimerToast({
            title: error.response.data,
            icon: icon.ERROR,
          });
          navigate("/myBooks");
        });
    } else {
      customAxios
        .report_update(reportId, reportRequest)
        .then((res) => {
          if (res.status === 200) {
            setReportTitle(res.data.title);
            setReportContent(res.data.content);
            setFormWriteModal(!formWriteModal);
          }
        })
        .catch((error) => {
          console.log(error);
          TimerToast({
            title: error.response.data,
            icon: icon.ERROR,
          });
          navigate("/myBooks");
        });
    }
  };

  // 노래 추천
  const [musicList, setMusicList] = useState([]);
  const [musicModal, setMusicModal] = useState(false);
  const onMusicRecommend = () => {
    customAxios
      .music_recommend(reportId)
      .then((res) => {
        if (res.status === 200) {
          setMusicList(res.data.musicList);
        }
      })
      .catch((error) => {
        console.log(error);
        setMusicModal(false);
        TimerToast({
          title: error.response.data,
          icon: icon.ERROR,
        });
      });
  };
  const toggleMusicModal = () => {
    setMusicModal(!musicModal);
  };

  const repeatMusic = (musicList) => {
    let arr = [];
    for (let i = 0; i < musicList.length; i++) {
      arr.push(
        <Row
          className="align-items-center text-center mt-4"
          key={musicList[i].title}
        >
          <Col sm="1">
            <h5>{i + 1}</h5>
          </Col>
          <Col>
            <img
              className={styles.musicImg}
              src={musicList[i].imageUrl}
              alt="musicImage"
            ></img>
          </Col>
          <Col>
            <h5>{musicList[i].title}</h5>
          </Col>
          <Col>
            <h5>{musicList[i].singer}</h5>
          </Col>
        </Row>
      );
    }
    return arr;
  };

  // 감정 수정 버튼
  const [emotionFormModal, setEmotionFormModal] = useState(false);
  const toggleEmotionModal = () => {
    setEmotionFormModal(!emotionFormModal);
    toggleMusicModal();
  };

  const [emotionPill, setEmotionPill] = useState(1);
  const toggleEmotionNavs = (index) => {
    setEmotionPill(index);
  };

  useEffect(() => {
    if (emotionPill === 1) {
      setReportEmotionType("HAPPY");
    } else if (emotionPill === 2) {
      setReportEmotionType("SAD");
    } else if (emotionPill === 3) {
      setReportEmotionType("SURPRISED");
    } else if (emotionPill === 4) {
      setReportEmotionType("SCARY");
    } else if (emotionPill === 5) {
      setReportEmotionType("ANGER");
    }
  }, [emotionPill, reportEmotionType]);

  const onChangeEmotion = () => {
    const reportRequest = {
      title: reportTitle,
      content: reportContent,
      emotion: reportEmotionType,
    };

    customAxios
      .report_update(reportId, reportRequest)
      .then((res) => {
        if (res.status === 200) {
          setReportEmotionType(res.data.emotionType);
          toggleEmotionModal(!emotionFormModal);
          setMusicList([]);
          onMusicRecommend();
        }
      })
      .catch((error) => {
        console.log(error);
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
                  <Button
                    className="btn-white"
                    color="default"
                    size="sm"
                    onClick={onDelete}
                  >
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
                              className={classnames(
                                "mb-sm-3 mb-md-0",
                                {
                                  active: pill === 1,
                                },
                                styles.pillBtn
                              )}
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
                              className={classnames(
                                "mb-sm-3 mb-md-0",
                                {
                                  active: pill === 2,
                                },
                                styles.pillBtn
                              )}
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
                              className={classnames(
                                "mb-sm-3 mb-md-0",
                                {
                                  active: pill === 3,
                                },
                                styles.pillBtn
                              )}
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
                              <Rating onClick={(rate) => handleRating(rate)} />
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
                                    value={updateStartDate}
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
                                    value={updateEndDate}
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
      <div className="pb-5">
        <Container>
          <Card className="shadow p-5">
            {reportTitle.length !== 0 ? (
              <div className={styles.reportBox}>
                <div className="text-right">
                  <span>
                    <Button
                      className="btn-white"
                      color="default"
                      size="sm"
                      onClick={toggleWriteModal}
                    >
                      <span className="btn-inner--text">&nbsp;수정&nbsp;</span>
                    </Button>
                  </span>
                  <span className="ml-2">
                    <Button
                      className="btn-white"
                      color="default"
                      size="sm"
                      onClick={toggleMusicModal}
                    >
                      <span
                        className="btn-inner--text"
                        onClick={onMusicRecommend}
                      >
                        &nbsp;노래 추천&nbsp;
                      </span>
                    </Button>
                  </span>
                </div>
                <h4 className="display-4">{reportTitle}</h4>
                <hr className="mt-2" />
                <p className="lead">{reportContent}</p>
              </div>
            ) : (
              <div className={styles.reportBox2}>
                <h5 className="text-center mt-3">등록된 독후감이 없습니다.</h5>
                <Button
                  className="btn-neutral btn-icon mt-5"
                  color="default"
                  onClick={toggleWriteModal}
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-pencil mr-2 fa-lg" aria-hidden="true" />
                  </span>
                  작성하기
                </Button>
              </div>
            )}
            <Modal
              className={`${styles.modalBox} modal-dialog-centered`}
              isOpen={formWriteModal}
              toggle={toggleWriteModal}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <h5 className="font-weight-bold text-center">
                      독후감을 작성해보세요!
                    </h5>
                    <FormGroup>
                      <Input
                        className="form-control-alternative form-control-lg text-dark"
                        placeholder="제목"
                        type="text"
                        onChange={changeReportTitle}
                        value={updateReportTitle}
                      />
                    </FormGroup>
                    <FormGroup>
                      <textarea
                        className={`${styles.reportContent} form-control-alternative form-control-lg`}
                        placeholder="내용"
                        type="text"
                        onChange={changeReportContent}
                        value={updateReportContent}
                      />
                    </FormGroup>
                    <div className="text-center mt-4">
                      <Button
                        className="btn-1"
                        color="primary"
                        outline
                        type="button"
                        onClick={onReportSave}
                      >
                        저장하기
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Modal>
            <Modal
              className={`${styles.modalBox} modal-dialog-centered`}
              isOpen={musicModal}
              toggle={toggleMusicModal}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <h5 className="font-weight-bold text-center">
                      어울리는 노래를 추천해드려요!
                    </h5>
                    {musicList.length !== 0 ? (
                      <div>
                        <Row className="text-center mt-3">
                          <Col sm="1">
                            <p className="font-weight-bold">번호</p>
                          </Col>
                          <Col>
                            <p className="font-weight-bold">앨범 커버</p>
                          </Col>
                          <Col>
                            <p className="font-weight-bold">제목</p>
                          </Col>
                          <Col>
                            <p className="font-weight-bold">가수</p>
                          </Col>
                        </Row>
                        {repeatMusic(musicList)}
                        <div className="text-right mt-3">
                          <span role="button" onClick={toggleEmotionModal}>
                            노래가 마음에 안드시나요?
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h5 className="mt-3 text-muted">
                          잠시만 기다려 주세요.
                        </h5>
                        <ScaleLoader color="#646EDE" />
                      </div>
                    )}
                    <div className="text-center mt-4">
                      <Button
                        className="btn-1"
                        color="primary"
                        outline
                        type="button"
                        onClick={toggleMusicModal}
                      >
                        확인
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Modal>
            <Modal
              className={`${styles.modalBox} modal-dialog-centered`}
              isOpen={emotionFormModal}
              toggle={toggleEmotionModal}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <h5 className="font-weight-bold text-center">
                      이 책을 읽으면서 가장 가깝게 느꼈던 감정을 선택해주세요.
                    </h5>
                    <div className="text-center mt-4">
                      <Nav
                        className="nav-pills-circle mb-5 justify-content-center"
                        id="tabs_2"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={emotionPill === 1}
                            className={classnames("p-3", {
                              active: emotionPill === 1,
                            })}
                            onClick={(e) => toggleEmotionNavs(1)}
                            href="#pablo"
                            role="tab"
                          >
                            <span className="nav-link-icon d-block">
                              <Smile />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={emotionPill === 2}
                            className={classnames("p-3", {
                              active: emotionPill === 2,
                            })}
                            onClick={(e) => toggleEmotionNavs(2)}
                            href="#pablo"
                            role="tab"
                          >
                            <span className="nav-link-icon d-block">
                              <SadTear />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={emotionPill === 3}
                            className={classnames("p-3", {
                              active: emotionPill === 3,
                            })}
                            onClick={(e) => toggleEmotionNavs(3)}
                            href="#pablo"
                            role="tab"
                          >
                            <span className="nav-link-icon d-block">
                              <Surprise />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={emotionPill === 4}
                            className={classnames("p-3", {
                              active: emotionPill === 4,
                            })}
                            onClick={(e) => toggleEmotionNavs(4)}
                            href="#pablo"
                            role="tab"
                          >
                            <span className="nav-link-icon d-block">
                              <Tired />
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={emotionPill === 5}
                            className={classnames("p-3", {
                              active: emotionPill === 5,
                            })}
                            onClick={(e) => toggleEmotionNavs(5)}
                            href="#pablo"
                            role="tab"
                          >
                            <span className="nav-link-icon d-block">
                              <Angry />
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <Button
                        className="btn-1"
                        color="primary"
                        outline
                        type="button"
                        onClick={onChangeEmotion}
                      >
                        확인
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Modal>
          </Card>
        </Container>
      </div>
    </Layout>
  );
}

export default MyBookDetail;
