import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  padding: 10px 18px 10px 10px;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 28px);
  text-decoration: none;
  color: #3d3d3d;
  background-color: #fff;
  margin-bottom: 12px;

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 4px 9px 0px rgba(50, 50, 50, 0.44);
  }
`;
