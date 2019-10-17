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
      padding: 4px;
      border: 1px solid #dfe3e9;
      min-height: 100px;
      margin-bottom: 16px;
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

    .select {
      margin-bottom: 12px;
    }

    .tags-input {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      min-height: 48px;
      width: 100%;
      border-radius: 2px;
      margin-bottom: 12px;

      &:focus-within {
        border: 1px solid #0052cc;
      }

      input {
        flex: 1;
        border: none;
        height: 46px;
        font-size: 14px;
        padding: 0 8px;
        border-radius: 2px;
        &:focus {
          outline: transparent;
        }
      }
    }

    #tags {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 8px 0 0 0;
    }

    .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 4px 8px 4px;
      background-color: #0052cc;

      .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: #0052cc;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
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

export const CancelKeyword = styled(Cancel)`
  color: #fff;
  height: 20px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    opacity: 0.8;
  }
`;
