import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
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
    padding: 10px;
  }

  input {
    height: 40px;
    width: 80%;
    border-radius: 4px;
    border: none;
    padding: 4px;
    margin: 10px 0;
  }

  button {
    padding: 10px;
    background-color: #429fca;
    border: none;
    border-radius: 2px;
    color: #fff;
    margin-top: 30px;
    height: 40px;
    font-size: 18px;
    align-self: flex-end;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
