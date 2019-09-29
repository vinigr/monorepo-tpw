import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 30px 0 40px;
  }

  form {
    display: flex;
    height: 350px;
    width: 30%;
    flex-direction: column;
    align-items: center;
    background-color: #d0d0d0;
    border-radius: 4px;
    padding: 10px 20px;
    border: #6b6b6b solid 1px;
  }

  input {
    height: 40px;
    width: calc(100% - 8px);
    border-radius: 4px;
    border: none;
    padding: 4px;
    margin: 10px 0;

    &:focus {
      border: solid #429fca 1px;
    }
  }

  div#options {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 14px;
  }

  button {
    padding: 10px;
    background-color: #429fca;
    border: none;
    border-radius: 2px;
    color: #fff;
    height: 40px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const LinkHome = styled(Link)`
  display: flex;
  align-items: center;
  width: 160px;
  margin-bottom: 30px;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
  }
`;

export const LinkRegister = styled(Link)`
  color: #4e4e4e;

  &:hover {
    opacity: 0.8;
  }
`;
