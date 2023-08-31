import React, { useState, useCallback, useEffect } from "react";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import classnames from "classnames";
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "reactstrap";
import { customAxios } from "../../api/customAxios.js";
import { useNavigate } from "react-router-dom";
import "../../css/BookSearch.css";

function BookSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.keyword;
  const [state, setState] = useState({});
  const [keyword, setKeyword] = useState(data);
  const [bookList, setBookList] = useState([]);
  const onChangeKeyword = useCallback(
    (event) => setKeyword(event.target.value),
    []
  );
  const search = (keyword) => {
    customAxios
      .search(keyword)
      .then((res) => {
        if (res.status === 200) {
          setBookList(res.data.items);
        }
      })
      .catch((error) => {
        setBookList([]);
      });
  };

  useEffect(() => {
    search(data);
  }, [data]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/book/search?query=${keyword}`, {
        state: { keyword: keyword },
      });
    }
  };

  const repeatBook = (bookList) => {
    let arr = [];
    for (let i = 0; i < bookList.length; i++) {
      arr.push(
        <Row className="book align-items-center">
          <Col className="bookImageBox">
            <img src={bookList[i].image} className="bookImage" />
          </Col>
          <Col sm="5">
            <p className="book-title text-uppercase font-weight-bold">
              {bookList[i].title}
            </p>
            <p className="text-muted">{bookList[i].author}</p>
            <p className="text-muted">{bookList[i].publisher}</p>
          </Col>
          <Col sm="5" className="book-description text-muted">
            <p>{bookList[i].description}</p>
          </Col>
        </Row>
      );
    }
    return arr;
  };

  return (
    <Layout>
      <Hero>
        <FormGroup
          className={classnames({
            focused: state.searchAltFocused,
          })}
          onKeyDown={onKeyDown}
        >
          <InputGroup className="input-group-alternative mb-4" id="search">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-zoom-split-in" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="책 제목을 검색하세요"
              type="text"
              onFocus={(e) => setState({ searchAltFocused: true })}
              onBlur={(e) => setState({ searchAltFocused: false })}
              onChange={onChangeKeyword}
              value={keyword}
            />
          </InputGroup>
        </FormGroup>
      </Hero>
      <div className="pb-5">
        <Container>
          <Card className="shadow mt--300">
            <div className="bookList">
              {bookList.length !== 0 ? (
                <Container className="p-5">{repeatBook(bookList)}</Container>
              ) : (
                <>
                  <div className="text-center p-5">
                    {/* <p>해당 검색어에 대한 검색 결과가 존재하지 않습니다.</p> */}
                    <Row className="py-3 align-items-center">
                      <Col sm="2">
                        <small className="text-uppercase text-muted font-weight-bold">
                          Heading 1
                        </small>
                      </Col>
                      <Col sm="5">
                        <h1 className="mb-0">Argon Design System</h1>
                      </Col>
                      <Col sm="5">
                        <h1 className="mb-0">Argon Design System</h1>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
            </div>
          </Card>
        </Container>
      </div>
    </Layout>
  );
}

export default BookSearch;
