import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    from {
        background-position: -100vw 0
    }
    to {
        background-position: 100vw 0
    }
`;

export const Container = styled.div`
  margin-top: 25px;

  div {
    cursor: default !important;
    width: 100%;
    height: 60px;
    padding: 0;
    margin-bottom: 25px;

    background: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    ) !important;
    background-size: 200% 60px !important;
    border-radius: 4px;
    animation: ${loading} 1s linear infinite;
  }
`;
