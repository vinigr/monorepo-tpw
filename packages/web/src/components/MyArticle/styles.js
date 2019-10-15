import styled from 'styled-components';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';
import { Edit } from 'styled-icons/material/Edit';

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;

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

export const Check = styled(CheckCircle)`
  color: green;
  width: 24px;
`;

export const EditIcon = styled(Edit)`
  color: ${props => (props.editavel ? '#36B203' : '#C02B27')};
  width: 24px;
`;
