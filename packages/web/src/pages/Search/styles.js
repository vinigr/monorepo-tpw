import styled from 'styled-components';

export const Container = styled.div`
  section#area-search {
    display: flex;
    align-items: center;
    background-color: #f1f1f1;
    height: 60px;
    padding: 10px 14px;

    img {
      width: 100px;
      margin-right: 20px;
    }

    input {
      height: 40px;
      width: 500px;
      border-radius: 4px;
      border: none;
      padding: 4px;
    }
  }

  section#results {
    width: 70%;
    padding: 10px;
  }
`;
