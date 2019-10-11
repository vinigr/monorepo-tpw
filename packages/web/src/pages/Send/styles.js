import styled from 'styled-components';
import { FileArchive } from 'styled-icons/fa-solid/FileArchive';
import { FilePdf } from 'styled-icons/fa-solid/FilePdf';
import { Cancel } from 'styled-icons/material/Cancel';

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

    div#upload {
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      border: 1px dashed #ddd;
      color: #999;
      margin: 20px auto 10px;
      cursor: pointer;
      width: 60%;
      margin-bottom: 20px;
    }

    textarea {
      resize: none;
      width: calc(100% - 8px);
      border-radius: 2px;
      padding: 2px 4px;
      border: 1px solid #dfe3e9;
      min-height: 100px;
    }

    div#pdf {
      width: 90%;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto 0;

      span {
        margin: 0 8px;
      }
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
  }
`;

export const IconArchive = styled(FileArchive)`
  color: #999;
  height: 30px;
`;

export const IconPdf = styled(FilePdf)`
  color: #f00;
  height: 30px;

  &:hover {
    opacity: 0.8;
  }
`;

export const IconCancel = styled(Cancel)`
  color: #999;
  height: 30px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
