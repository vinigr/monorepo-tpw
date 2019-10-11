import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useDropzone } from 'react-dropzone';
import { Container, IconArchive, IconPdf, IconCancel } from './styles';

export default function Send() {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [archive, setArchive] = useState();
  const [keywords, setKeywords] = useState('');

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

  return (
    <Container>
      <form>
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
        <input
          className="text"
          type="text"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
        />
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
