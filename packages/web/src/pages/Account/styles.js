import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #6cbceb;
  min-height: 100vh;
  height: 100%;
  color: #ececec;

  header {
    width: calc(100vw - 40px);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 10px 20px;

    div {
      display: flex;
      align-items: center;
    }

    img {
      width: 100px;
      margin-right: 20px;
    }

    h5 {
      font-size: 16px;
      margin-right: 6px;
    }

    button {
      padding: 8px 10px;
      border: none;
      cursor: pointer;
      background-color: #fff;
      border-radius: 2px;
      font-size: 16px;
      font-weight: 600;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  h2 {
    margin-bottom: 10px;
  }

  #articles,
  #users {
    width: 80%;
  }
`;
