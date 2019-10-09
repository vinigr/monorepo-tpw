import styled from 'styled-components';
import { FileArchive } from 'styled-icons/fa-solid/FileArchive';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: #e7e7e7;
    padding: 20px;

    label {
      color: #7f8fa4;
      margin-bottom: 4px;
    }

    input.text {
      height: 30px;
      border-radius: 2px;
      padding: 2px 4px;
      border: 1px solid #dfe3e9;
      margin-bottom: 12px;
    }

    div#upload {
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      border: 1px dashed #ddd;
      color: #999;
      margin-top: 20px;
      cursor: pointer;
      width: 60%;
      margin-bottom: 20px;
    }
  }
`;

export const IconImage = styled(FileArchive)`
  color: #999;
  height: 30px;
`;
