import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.li`
  background-color: #f7f7f7;
  margin-bottom: 10px;
  border-radius: 2px;
  list-style-type: none;
  padding: 10px;

  h3 {
    margin-bottom: 6px;
  }

  span {
    margin-right: 4px;
  }
`;

export const LinkArticle = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #3d3d3d;
`;
