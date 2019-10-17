import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: #e7e7e7;
    padding: 10px 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    label {
      color: #7f8fa4;
      margin-bottom: 4px;
    }

    input.text {
      height: 30px;
      width: calc(100% - 8px);
      border-radius: 2px;
      padding: 2px 4px;
      border: 1px solid #dfe3e9;
      margin-bottom: 12px;
    }

    button {
      padding: 8px;
      background-color: #429fca;
      border: none;
      border-radius: 2px;
      color: #fff;
      align-self: flex-end;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        opacity: 0.8;
      }
    }

    .select {
      margin-bottom: 12px;
    }
  }
`;
