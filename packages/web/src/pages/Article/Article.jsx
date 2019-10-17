import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

import {
  Container,
  IconArchive,
  IconPdf,
  IconCancel,
  CancelKeyword,
} from './styles';
import AuthService from '../../service/auth';

import logo from '../../assets/images/rede-ftc.png';

const article = {
  id: 'ikfdjsoijfsd',
  titulo: 'Gamificação como estratégia de aprendizagem',
  orientador: { id: '111', nome: 'José Barros Castro' },
  autores: [
    { id: '5da651adf111b311886efa93', nome: 'Estevan Ferreira Martins' },
    { id: 'tpw2', nome: 'Alex Barros Lima' },
  ],
  outrosAutores: ['Eduarda Cunha Barbosa'],
  palavrasChave: ['Gamificação', 'Tecnologia', 'Aprendizagem'],
  resumo: `Phasellus vel viverra neque. Cras vehicula tortor laoreet, 
    eleifend erat quis, vehicula ante. In lectus eros, eleifend 
    sed ligula at, placerat convallis leo. Quisque tristique molestie 
    urna, a gravida magna finibus at. Ut tincidunt orci urna, sit amet 
    eleifend tortor dapibus in. Praesent scelerisque tortor lacus, id 
    placerat nibh egestas ut. Morbi aliquam vestibulum arcu nec iaculis. 
    Proin convallis magna lacus, id consectetur tortor egestas sed. Nam 
    gravida sagittis nibh at vestibulum. Quisque scelerisque ipsum eu 
    augue aliquet convallis. Maecenas tellus nunc, dignissim nec dolor ac, 
    imperdiet ultrices nulla. Nullam gravida mauris ac pellentesque rutrum. 
    Donec tincidunt eu urna ac pellentesque.`,
  caminho:
    'https://americalatina.dint.fgv.br/sites/americalatina.dint.fgv.br/files/teste33.pdf',
  editavel: false,
  publicado: true,
};

export default function Article() {
  const [name, setName] = useState('');
  const [archive, setArchive] = useState();
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isOrientador, setIsOrientador] = useState(false);
  const [edit, setEdit] = useState(false);
  const [publicado, setPublicado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = AuthService.getId();

    if (article.autores.filter(autor => autor.id === id).length > 0) {
      setIsAuthor(true);
    }

    if (article.orientador.id === id) {
      setIsOrientador(true);
    }

    setLoading(false);
  }, [isAuthor]);

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

  function renderContent({
    titulo,
    autores,
    outrosAutores,
    orientador,
    palavrasChave,
    resumo,
    caminho,
  }) {
    return (
      <main>
        <h1>{titulo}</h1>
        <div id="autores">
          {autores.map(autor => (
            <h2 key={autor.id}>{autor.nome}</h2>
          ))}
          {outrosAutores &&
            outrosAutores.map(autor => <h2 key={autor}>{autor}</h2>)}
        </div>
        {orientador && (
          <div id="orientador">
            <h3>Professor orientador: </h3> <h4>{orientador.nome}</h4>
          </div>
        )}
        <div id="resumo">
          <h3>Resumo</h3>
          <p>{resumo}</p>
        </div>
        <div id="palavras">
          <h4>Palavras-chave:</h4>
          {palavrasChave.map(palavra => (
            <h5 key={palavra}>{palavra};</h5>
          ))}
        </div>
        <a href={caminho} target="_blank" rel="noopener noreferrer">
          <IconPdf />
          <span>Acesso ao artigo</span>
        </a>
      </main>
    );
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <img src={logo} alt="rede-ftc-logo" />
        </Link>
      </header>
      {loading ? null : isOrientador || (isAuthor && article.editavel) ? (
        <form>
          <label>Qual o nome do artigo?</label>
          <input
            className="text"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
        </form>
      ) : (
        renderContent(article)
      )}
      {isOrientador && (
        <div id="orientador-options">
          <div>
            <h4>Permitir edição</h4>
            <Switch
              checked={edit}
              onChange={() => setEdit(!edit)}
              value="edit"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <div>
            <h4>Publicado</h4>
            <Switch
              checked={publicado}
              onChange={() => setPublicado(!publicado)}
              value="publicado"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
