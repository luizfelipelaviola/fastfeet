import styled from 'styled-components';
import { lighten } from 'polished';

export const DeliveryProblems = styled.button`
  margin-right: 20px;
  background: ${props =>
    props.problem ? '#de3b3b' : lighten(0.25, '#de3b3b')};
  color: #fff;
  display: flex;
  align-items: center;
  transition: background 0.25s;

  &:hover {
    background: ${lighten(0.1, '#de3b3b')};
  }
`;
