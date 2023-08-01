import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
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

import Layout from "../components/Layout"
import {customAxios, memberURL} from "../api/customAxios.js"

import {icon, MixinToast} from "../components/Alert.js"

function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // 아이디
  const onChangeUsername = useCallback((event) => setUsername(event.target.value), [])

  // 비밀번호
  const onChangePassword = useCallback((event) => setPassword(event.target.value), [])

  // 비밀번호 확인
  const onChangeConfirmPassword = useCallback(
    (event) => {
      const current_confirmPassword = event.target.value;
      setConfirmPassword(current_confirmPassword);
      setIsConfirmPassword(password === current_confirmPassword);
    }, [password]
  )

  // 제출
  const onSubmit = useCallback(
    async (event) =>{
      event.preventDefault();
      // 회원 가입 dto
      const joinDto = {
        username : username,
        password : password,
        password2 : confirmPassword
      }

      if (username.length === 0){
        MixinToast({icon: icon.ERROR, title: "아이디를 입력해주세요."})
        return;
      }

      if (password.length === 0){
        MixinToast({icon: icon.ERROR, title: "비밀번호를 입력해주세요."})
        return;
      }

      if (confirmPassword.length === 0){
        MixinToast({icon: icon.ERROR, title: "비밀번호를 재확인해주세요."})
        return;
      }

      if (!isConfirmPassword) {
        MixinToast({icon: icon.ERROR, title: "비밀번호가 일치하지 않습니다."})
        return;
      }

        customAxios.join(joinDto)
        .then((res) => {
          if (res.status === 200){
            MixinToast({icon: icon.SUCCESS, title: "회원 가입 성공!"})
            navigate(memberURL.MEMBER_LOGIN_URL);
          }
        }).catch((error)=>{
        console.error(error);   
      });
    }
    ,[username, password, confirmPassword, isConfirmPassword, navigate]
  )

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
                      <div className="text-muted text-center">
                        <small>Sign up with credentials</small>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit = {onSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="아이디" type="text" onChange={onChangeUsername} value={username}/>
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
                              onChange ={onChangePassword}
                              value={password}
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
                              placeholder="비밀번호 재확인"
                              type="password"
                              autoComplete="off"
                              value = {confirmPassword}
                              onChange = {onChangeConfirmPassword}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted font-italic">
                          <small>
                            Confirm password:{" "}
                            {isConfirmPassword ? (
                            <span className="text-success font-weight-700" >
                            success
                            </span>
                            ) : 
                            <span className="text-danger font-weight-700" >
                            fail
                            </span>}
                          </small>
                        </div>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            회원 가입
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
    </Layout>
  );
}

export default Join;
