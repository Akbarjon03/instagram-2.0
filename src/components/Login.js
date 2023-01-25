import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
function Login() {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };
  return (
    <LoginContainer>
      <ContentsWrapper>
        <img src={Logo} alt="Logo" />
        <p>Instagram</p>
        <button onClick={signIn}>
          <img src={Google} alt="" />
          <span style={{ paddingRight: 20 }}>Sign in with Google</span>
        </button>
      </ContentsWrapper>
    </LoginContainer>
  );
}

export default Login;
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100vw;
`;
const ContentsWrapper = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  > img {
    object-fit: contain;
    height: 100px;
  }
  > p {
    color: #4a5568;
    font-size: 20px;
    padding: 10px;
  }
  > button {
    display: flex;
    align-items: center;
    margin: auto;
    color: #fff;
    background-color: #4285f4;
    border: 1px solid #4285f4;
    border-radius: 3px;
    font-weight: 700;
    font-size: 15px;
    padding: 1px;
    cursor: pointer;
  }
  > button > img {
    padding: 10px;
    background-color: #fff;
    object-fit: contain;
    height: 20px;
    margin-right: 20px;
  }
  > h6 {
    color: #2d3748;
    padding: 20px;
  }
`;
