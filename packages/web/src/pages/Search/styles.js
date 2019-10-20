import styled from 'styled-components';

export const Container = styled.div`
  section#area-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f1f1;
    height: 60px;
    padding: 10px 14px;

    div#initial-area {
      display: flex;
      align-items: center;
    }

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

  section#articles {
    width: calc(100% - 20px);
    display: flex;
    padding: 10px;
  }

  section#results {
    width: 70%;
    margin-right: 10px;
  }

  section#last {
    width: 30%;

    h2 {
      margin-bottom: 8px;
    }
  }
`;
