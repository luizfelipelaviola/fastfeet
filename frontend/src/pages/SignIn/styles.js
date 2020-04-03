import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #7d40e7;

  form {
    width: 360px;
    padding: 60px 30px;

    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;

    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      color: #7d40e7;
      width: 240px;
      height: 44px;
      align-self: center;
      margin-bottom: 40px;
    }

    > label {
      color: #444444;
      font-weight: bold;
      margin-bottom: 9px;
      display: flex;
      flex-direction: column;

      input {
        height: 45px;
        padding: 15px;
        margin-top: 9px;
        margin-bottom: 15px;
        border-radius: 4px;
        border: 1px solid #dddddd;

        &::placeholder {
          color: #999999;
        }

        &.error {
          border: 1px solid #de0a0a;
        }
      }
    }

    span {
      color: #de0a0a;
      font-weight: bold;
      margin-bottom: 15px;
    }

    button {
      height: 45px;
      background: #7d40e7;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      border: 0;
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.1, '#7d40e7')};
      }
    }
  }
`;
