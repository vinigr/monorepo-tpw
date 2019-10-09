import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useDropzone } from 'react-dropzone';
import { Container, IconImage } from './styles';

export default function Send() {
  const [name, setName] = useState('');
  const [archive, setArchive] = useState();

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
        <label>Qual o nome do artigo?</label>
        <input
          className="text"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Quem são os autores?</label>
        <AsyncSelect isMulti loadOptions={() => {}} placeholder="Selecione" />
        {!archive && (
          <div id="upload" {...getRootProps()}>
            <IconImage />
            <input {...getInputProps()} />
            <p>Arraste um arquivo ou clique aqui</p>
          </div>
        )}
      </form>
    </Container>
  );
}
