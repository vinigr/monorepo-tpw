import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  h2 {
    margin-bottom: 6px;
  }

  ul {
    width: 100%;
    list-style-type: none;
  }
`;

export const ArticleItem = styled.li`
  background-color: #f5f5f5;
  padding: 6px;
  border-radius: 4px;
`;

export const ArticleLink = styled(Link)`
  text-decoration: none;
  color: #000;

  h3 {
    text-decoration: underline;
    margin-bottom: 10px;
  }
`;
