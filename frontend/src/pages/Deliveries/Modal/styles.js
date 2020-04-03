import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    background-color: #fefefe;
    margin: calc(100vh - 100vh * 0.75) auto 0 auto;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .modal-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      button {
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        color: #999;
        transition: 0.5s;

        &:hover {
          color: ${darken(0.1, '#999')};
        }
      }
    }

    .modal-body {
      .label {
        font-size: 14px;
        font-weight: bold;
        color: #444;
        margin-bottom: 6px;
      }

      p {
        font-size: 16px;
        color: #666;
        margin-bottom: 8px;
      }

      hr {
        margin: 10px 0;
        border: 1px solid #eee;
      }

      .sign {
        width: 100%;
        text-align: center;
      }

      img {
        max-width: 100%;
      }
    }
  }
`;
