import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';
import { Cancel } from 'styled-icons/typicons/Cancel';

export const Container = styled.li`
  display: flex;
  background-color: #fff;
  margin-bottom: 12px;

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 4px 9px 0px rgba(50, 50, 50, 0.44);
  }

  h3 {
    color: #3e3e3e;
  }

  #status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span:first-child {
      font-weight: 600;
    }
  }
`;

export const LinkArticle = styled(Link)`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #3d3d3d;
`;

export const Check = styled(CheckCircle)`
  color: green;
  width: 24px;
  margin-left: 4px;
`;

export const CancelIcon = styled(Cancel)`
  color: #c02b27;
  width: 24px;
  margin-left: 4px;
`;
