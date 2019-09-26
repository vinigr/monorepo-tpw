import styled from "styled-components";
import { Search } from "styled-icons/material/Search";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw - 40px);
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }

  img {
    width: 200px;
    margin-bottom: 24px;
  }

  div#search {
    display: flex;
    background-color: #fdfdfd;
    width: 60%;
    border-radius: 4px;
    height: 40px;
    margin-bottom: 14px;
    align-items: center;
    padding: 4px 6px;
    border: #5b5b5b solid 1px;
  }

  input {
    background-color: #fdfdfd;
    border: none;
    padding: 4px 6px;
    height: 100%;
    width: 100%;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
`;

export const IconSearch = styled(Search)`
  height: 30px;
  color: #429fca;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const LinkLogin = styled(Link)`
  background-color: #429fca;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
