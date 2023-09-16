import React, { useCallback, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import Layout from "../components/Layout";
import {
  customAxios,
  updateAccessToken,
  updateRefreshToken,
} from "../api/customAxios.js";
import { icon, MixinToast, TimerToast } from "../components/Alert.js";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../api/cookie.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = useCallback(
    (event) => setUsername(event.target.value),
    []
  );
  const onChangePassword = useCallback(
    (event) => setPassword(event.target.value),
    []
  );

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // 로그인 dto
      const loginDto = {
        username: username,
        password: password,
      };

      if (username.length === 0) {
        MixinToast({ icon: icon.ERROR, title: "아이디를 입력해주세요." });
        return;
      }

      if (password.length === 0) {
        MixinToast({ icon: icon.ERROR, title: "비밀번호를 입력해주세요." });
        return;
      }

      customAxios
        .login(loginDto)
        .then((res) => {
          if (res.status === 200) {
            MixinToast({ icon: icon.SUCCESS, title: "로그인 성공" });
            if (res.data.accessToken) {
              updateAccessToken(res.data.accessToken);
            }
            if (res.data.refreshToken) {
              updateRefreshToken(res.data.refreshToken);
            }
            console.log(getCookie("accessToken"));
            navigate(-1);
          }
        })
        .catch((error) => {
          console.error(error.response.data);
          TimerToast({
            title: error.response.data,
            icon: icon.ERROR,
          });
        });
    },
    [username, password, navigate]
  );

  return (
    <Layout>
      <section className="section section-shaped section-lg vh-100">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white">
                  <div className="text-center">
                    <h5>로그인</h5>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form" onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="아이디"
                          type="text"
                          onChange={onChangeUsername}
                          value={username}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="비밀번호"
                          type="password"
                          autoComplete="off"
                          onChange={onChangePassword}
                          value={password}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        로그인
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="text-right" xs="6">
                <a className="text-light" href="/member/join">
                  <small>계정이 없으신가요?</small>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default Login;
