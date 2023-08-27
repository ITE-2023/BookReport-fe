import React, { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import { CookiesProvider } from "react-cookie";
import classnames from "classnames";
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import "./css/App.css";

function App() {
  const [state, setState] = useState({});

  return (
    <CookiesProvider>
      <Layout>
        <Hero />
        <section className="text-center">
          <p className="lead">책을 검색하여 독후감과 음악을 기록해보세요!</p>
          <FormGroup
            className={classnames({
              focused: state.searchAltFocused,
            })}
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
              />
            </InputGroup>
          </FormGroup>
        </section>
      </Layout>
    </CookiesProvider>
  );
}

export default App;
