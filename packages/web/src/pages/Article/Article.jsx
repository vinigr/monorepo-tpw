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

import api from '../../service/api';

import logo from '../../assets/images/rede-ftc.png';

export default function Article(props) {
  const [title, setTitle] = useState('');
  const [archive, setArchive] = useState();
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isOrientador, setIsOrientador] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  let id;
  const idArticle = props.match.params.id;

  useEffect(() => {
    if (article) {
      const { autores } = article;

      if (AuthService.loggedIn()) {
        id = AuthService.getId();
      }

      if (autores) {
        if (autores.filter(autor => autor._id === id).length > 0) {
          setIsAuthor(true);
        }
      }

      if (article.orientador) {
        if (article.orientador === id) {
          setIsOrientador(true);
        }
      }

      if (article.professor === id) {
        setIsProfessor(true);
      }

      if (article.titulo) {
        setTitle(article.titulo);
      }

      if (article.palavrasChave) {
        setKeywords(article.palavrasChave);
      }

      if (article.resumo) {
        setSummary(article.resumo.replace(/\s{2,}/g, ' '));
      }
      if (article.caminho) {
        setArchive(article.caminho);
      }

      setEdit(article.editavel);
      setPublished(article.publicado);
    }
  }, [article, id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`article/${idArticle}`);
        setArticle(data);
        setLoading(false);
      } catch (error) {}
    }

    fetchData();
  }, [idArticle]);

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

  const { getRootProps, getInputProps } = useDropzone(
    {
      accept: 'application/pdf',
      onDropAccepted: acceptedFile => {
        setArchive(
          Object.assign(acceptedFile[0], {
            preview: URL.createObjectURL(acceptedFile[0]),
          })
        );
      },
    },
    sendArchive()
  );

  async function sendArchive() {
    if (archive) {
      const formData = new FormData();
      formData.append('file', archive);
      try {
        const data = await api.post(`arquivo/${idArticle}`, formData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function saveChanges(e) {
    e.preventDefault();
    try {
      const data = await api.put(`/article/${idArticle}`, {
        title,
        summary,
        keywords,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function switchEdit() {
    try {
      await api.put(`/article/editable/${idArticle}`);
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  }

  async function switchPublish() {
    try {
      await api.put(`/article/published/${idArticle}`);
      setPublished(!published);
    } catch (error) {
      console.log(error);
    }
  }

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
            <h2 key={autor._id}>{autor.nome}</h2>
          ))}
          {outrosAutores &&
            outrosAutores.map(autor => <h2 key={autor}>{autor}</h2>)}
        </div>
        {orientador && (
          <div id="orientador">
            <h3>Professor orientador: </h3> <h4>{orientador.nome}</h4>
          </div>
        )}
        {resumo && (
          <div id="resumo">
            <h3>Resumo</h3>
            <p>{resumo}</p>
          </div>
        )}
        {palavrasChave.length > 0 && (
          <div id="palavras">
            <h4>Palavras-chave:</h4>
            {palavrasChave.map(palavra => (
              <h5 key={palavra}>{palavra};</h5>
            ))}
          </div>
        )}
        {archive && (
          <a href={caminho} target="_blank" rel="noopener noreferrer">
            <IconPdf />
            <span>Acesso ao artigo</span>
          </a>
        )}
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
      {loading ? null : isOrientador ||
        isProfessor ||
        (isAuthor && article.editavel) ? (
        <form onKeyDown={e => e.keyCode === 13 && e.preventDefault()}>
          <label>Qual o nome do artigo?</label>
          <input
            className="text"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
              <a
                href={archive.preview}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconPdf />
                <span>{archive.name}</span>
              </a>
              <IconCancel onClick={() => setArchive(null)} />
            </div>
          ) : (
            <div id="upload" {...getRootProps()}>
              <IconArchive />
              <input {...getInputProps()} />
              <p>Arraste um arquivo ou clique aqui</p>
            </div>
          )}
          <button onClick={saveChanges}>Salvar alterações</button>
        </form>
      ) : (
        (published || (isAuthor && !article.editavel)) && renderContent(article)
      )}
      {isOrientador && (
        <div id="orientador-options">
          <div>
            <h4>Permitir edição</h4>
            <Switch
              checked={edit}
              onChange={switchEdit}
              value="edit"
              color="secondary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <div>
            <h4>Publicado</h4>
            <Switch
              checked={published}
              onChange={switchPublish}
              value="published"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
