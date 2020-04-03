import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  label {
    display: inline-block !important;

    input {
      display: none;
    }

    > div {
      cursor: pointer;
      position: relative;
      width: 150px;
      height: 150px;
      padding: 1px;
      margin: 0 auto;
      border-radius: 50%;
      background: ${props => props.colorURI};
      transition: opacity 0.25s;

      &:hover {
        opacity: 0.75;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        padding: 1px;
        border-radius: 50%;

        &[src=''] {
          display: none;
        }
      }

      > span {
        color: #ddd;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }

      > div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 66px;
        color: ${props => darken(0.05, props.color)};
        background: ${props => transparentize(0.8, props.color)};
      }
    }
  }
`;
