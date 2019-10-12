import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  IconArchive,
  IconPdf,
  IconCancel,
  CancelKeyword,
} from './styles';

export default function Send() {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [archive, setArchive] = useState();
  const [keywords, setKeywords] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDropAccepted: acceptedFile => {
      setArchive(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );
    },
  });

  function addTags(e) {
    e.preventDefault();
    if (e.target.value !== '') {
      setKeywords([...keywords, e.target.value]);
      e.target.value = '';
    }
  }

  function removeTags(indexToRemove) {
    setKeywords([...keywords.filter((_, index) => index !== indexToRemove)]);
  }

  return (
    <Container>
      <form onKeyDown={e => e.keyCode === 13 && e.preventDefault()}>
        <h1>Enviar artigo</h1>
        <label>Qual o nome do artigo?</label>
        <input
          className="text"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Quem são os autores?</label>
        <AsyncSelect isMulti loadOptions={() => {}} placeholder="Selecione" />
        <label>Qual as palavras-chave?</label>
        <div className="tags-input">
          <ul id="tags">
            {keywords.map((tag, index) => (
              <li key={index} className="tag">
                <span>{tag}</span>
                <CancelKeyword onClick={() => removeTags(index)} />
              </li>
            ))}
          </ul>
          <input
            type="text"
            onKeyUp={event => event.keyCode === 13 && addTags(event)}
            placeholder="Pressione enter para adicionar mais palavras-chave"
          />
        </div>
        {/* <input
          className="text"
          type="text"
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
        /> */}
        <label>Qual o resumo?</label>
        <textarea
          className="text"
          type="text"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        {archive ? (
          <div id="pdf">
            <IconPdf />
            <span>{archive.name}</span>
            <IconCancel onClick={() => setArchive(null)} />
          </div>
        ) : (
          <div id="upload" {...getRootProps()}>
            <IconArchive />
            <input {...getInputProps()} />
            <p>Arraste um arquivo ou clique aqui</p>
          </div>
        )}
        <button>Concluir</button>
      </form>
    </Container>
  );
}
