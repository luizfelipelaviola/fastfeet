import styled from 'styled-components';

export const Container = styled.div`
  .grid-5 {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    grid-column-gap: 30px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 30px;
  }
`;
