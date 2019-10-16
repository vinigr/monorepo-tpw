import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #289cdf;
  min-height: 100vh;
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
