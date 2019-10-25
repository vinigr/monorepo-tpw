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

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw - 40px);
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 10px 20px;

    img {
      width: 100px;
      margin-bottom: 24px;
    }
  }

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
      flex-direction: column;
      justify-items: center;
      align-items: center;
      margin: 20px auto;

      div {
        display: flex;
        justify-content: center;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;

          span {
            margin: 0 8px;
          }
        }
      }

      button#upload {
        align-self: center;
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

  main {
    width: 70%;

    h1 {
      margin-bottom: 14px;
    }

    #autores {
      margin-bottom: 10px;

      h2 {
        font-size: 18px;
      }
    }

    #orientador {
      margin-bottom: 12px;

      h4 {
        font-weight: 500;
      }
    }

    #resumo {
      margin-bottom: 10px;

      p {
        text-align: justify;
      }
    }

    #palavras {
      display: flex;
      margin-bottom: 14px;

      h4 {
        margin-right: 6px;
      }

      h5 {
        font-size: 16px;
        font-weight: 400;
        margin-right: 4px;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      padding: 10px;
      border-radius: 2px;
      color: #000;
      background-color: #e8e8e8;
      width: 160px;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      span {
        margin-left: 8px;
      }
    }
  }

  #professor-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    margin-top: 26px;

    div {
      width: 40%;
      display: flex;
      flex-direction: column;
    }

    button {
      height: 40px;
      border: none;
      border-radius: 2px;
      padding: 6px;
      color: #fff;
      background-color: #e40c0c;

      &:hover {
        opacity: 0.8;
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
