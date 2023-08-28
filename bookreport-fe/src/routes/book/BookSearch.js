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
import { Button, Card, Container, Row, Col } from "reactstrap";
import { customAxios } from "../../api/customAxios.js";

function ReportForm() {
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
          console.log(res.data.items.length);
          setBookList(res.data.items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    search(data);
  }, [data]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      search(keyword);
    }
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
      <div className="">
        <Container>
          <Card className="shadow mt--300">
            <div className="bookList"></div>
          </Card>
        </Container>
      </div>
    </Layout>
  );
}

export default ReportForm;
