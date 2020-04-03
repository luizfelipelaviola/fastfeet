import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;

  .Modal {
    background: red;
  }

  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const Popup = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: 20px 15px;
  z-index: 1;

  &:after,
  &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    left: calc(50% - 10px);
    top: -15px;
    width: 0px;
    height: 0px;
  }
  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: rgba(0, 0, 0, 0.15);
    border-width: 5px;
    left: calc(50% - 4.828px);
    top: -10.5px;
    width: 0px;
    height: 0px;
  }

  button,
  a {
    display: flex;
    color: #999;
    font-size: 16px;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border: 0;
    background: 0;
    border-bottom: 1px solid #eee;
    transition: color 0.25s;

    &:hover {
      color: ${darken(0.1, '#999')};
    }

    &:last-child {
      border: 0;
      margin: 0;
      padding: 0;
    }

    svg {
      margin-right: 10px;
    }
  }
`;
