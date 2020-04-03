import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  height: 64px;
  padding: 19px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      border-right: 1px solid #ddd;
      padding-right: 30px;
      margin-right: 30px;
    }

    ul {
      display: flex;

      li {
        font-size: 15px;
        font-weight: bold;
        margin-right: 20px;

        &:last-child {
          margin: 0;
        }

        a {
          color: #999;
          transition: 0.5s;

          &:hover {
            color: ${darken(0.08, '#999')};
          }
        }

        a.active {
          color: #444;
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #666666;

    button {
      margin-top: 7px;
      border: 0;
      background: none;
      color: #de3b3b;
      transition: 0.5s;

      &:hover {
        color: ${darken(0.08, '#de3b3b')};
      }
    }
  }
`;
