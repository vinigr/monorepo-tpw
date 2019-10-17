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

import { articles } from '../../service/data';

import logo from '../../assets/images/rede-ftc.png';

export default function Article(props) {
  const [titulo, setTitulo] = useState('');
  const [archive, setArchive] = useState();
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isOrientador, setIsOrientador] = useState(false);
  const [edit, setEdit] = useState(false);
  const [publicado, setPublicado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  useEffect(() => {
    const id = AuthService.getId();
    setArticle(
      articles.filter(article => article.id === props.match.params.id)[0]
    );

    if (article) {
      if (article.autores.filter(autor => autor.id === id).length > 0) {
        setIsAuthor(true);
      }

      if (article.orientador) {
        if (article.orientador.id === id) {
          setIsOrientador(true);
        }
      }

      setTitulo(article.titulo);
      setKeywords(article.palavrasChave);
      if (article.resumo) {
        setSummary(article.resumo.replace(/\s{2,}/g, ' '));
      }
      if (article.caminho) {
        setArchive(article.caminho);
      }

      setLoading(false);
    }
  }, [article, props.match.params.id]);

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
          {palavrasChave &&
            palavrasChave.map(palavra => <h5 key={palavra}>{palavra};</h5>)}
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
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
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
