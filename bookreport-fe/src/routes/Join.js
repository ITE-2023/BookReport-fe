import React from "react";
import { userEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Join() {



  
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">회원 가입</h2>
              <p className="text-white-50 mb-3">
                아이디와 비밀번호를 입력해주세요.
              </p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="아이디"
                id="formControlLg"
                type="text"
                size="lg"
              />

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="비밀번호"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="비밀번호 재입력"
                id="formControlLg"
                type="password"
                size="lg"
              />
              <MDBBtn size="lg">Join</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Join;
