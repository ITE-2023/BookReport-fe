import React, { useState, useCallback } from "react";
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
  const data = location.state.data;
  const [state, setState] = useState({});
  const [keyword, setKeyword] = useState(data);
  const onChangeKeyword = useCallback(
    (event) => setKeyword(event.target.value),
    []
  );
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      customAxios
        .search(keyword)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
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
      <section className="section">
        <Container>
          <Card className="card-profile shadow mt--300">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </Card>
        </Container>
      </section>
    </Layout>
  );
}

export default ReportForm;
