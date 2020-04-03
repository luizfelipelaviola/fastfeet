import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.div`
  min-height: 100%;
  background: #f5f5f5;

  main {
    padding: 36px 120px;

    > h2 {
      margin-bottom: 35px;
    }

    h2 {
      display: flex;
      justify-content: space-between;
    }

    header {
      display: flex;
      justify-content: space-between;

      .input-group {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 4px;
        height: 36px;
        padding: 10px 16px;

        input {
          margin-left: 10px;
          flex: 1;
          border: 0;
          color: #666;

          &::placeholder {
            color: #999;
          }
        }
      }

      .controls {
        display: flex;
        margin-bottom: 20px;

        a,
        button {
          margin-left: 16px;
        }
      }

      a,
      button {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        border-radius: 4px;
        border: 0;
        padding: 10px 16px;
        transition: 0.5s;

        svg {
          margin-right: 5px;
        }
      }

      a.action,
      button.action {
        color: #fff;
        background: #7d40e7;

        &:hover {
          background: ${darken(0.08, '#7d40e7')};
        }
      }

      a.return,
      button.return {
        color: #fff;
        background: #ccc;

        &:hover {
          background: ${darken(0.08, '#ccc')};
        }
      }

      div {
        display: flex;
      }
    }

    table {
      width: 100%;
      font-size: 16px;

      border-collapse: separate;
      border-spacing: 0px 25px;
      th {
        color: #444;
        text-align: left;
        padding: 0 25px;

        &:last-child {
          text-align: center;
        }
      }

      tbody {
        td {
          padding: 20px 25px;
          background: #fff;
          color: #666;
          vertical-align: middle;

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            text-align: center;
            cursor: pointer;
          }

          span.name {
            display: flex;
            align-items: center;
          }

          span.state-indicator {
            position: relative;
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            padding: 5px 10px 5px 25px;
            border-radius: 12px;

            &::before {
              content: '';
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              left: 10px;
              top: 8px;
            }

            &.success {
              color: #2ca42b;
              background-color: #dff0df;

              &::before {
                background-color: #2ca42b;
              }
            }

            &.pending {
              color: #c1bc35;
              background-color: #f0f0df;

              &::before {
                background-color: #c1bc35;
              }
            }

            &.collected {
              color: #4d85ee;
              background-color: #bad2ff;

              &::before {
                background-color: #4d85ee;
              }
            }

            &.cancelled {
              color: #de3b3b;
              background-color: #fab0b0;

              &::before {
                background-color: #de3b3b;
              }
            }
          }
        }
      }
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        height: 40px;
        width: 40px;
        background: #7d40e7;
        border-radius: 4px;
        padding: 10px;
        border: 0;
        font-size: 17px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
        transition: background 0.25s;

        &:hover {
          background: ${darken(0.08, '#7d40e7')};
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;

          &:hover {
            background: #7d40e7;
          }
        }
      }

      p {
        display: block;
      }
    }

    footer {
      margin-top: 20px;
      text-align: center;
    }

    .content {
      background: #fff;
      border-radius: 4px;
      padding: 28px 30px;

      label {
        font-size: 14px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;

        input,
        select {
          color: #666;
          margin-top: 9px;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 13px 15px;
          font-size: 16px;

          &::placeholder {
            color: #999;
          }

          &.error {
            border: 1px solid #de3b3b;
          }
        }

        select {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;

          background-image: linear-gradient(45deg, transparent 50%, #ddd 50%),
            linear-gradient(135deg, #ddd 50%, transparent 50%);
          background-position: calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
          background-size: 5px 5px, 5px 5px, 1px 1.5em;
          background-repeat: no-repeat;

          &:focus {
            background-image: linear-gradient(45deg, #ddd 50%, transparent 50%),
              linear-gradient(135deg, transparent 50%, #ddd 50%);
            background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
              calc(100% - 2.5em) 0.5em;
            background-size: 5px 5px, 5px 5px, 1px 1.5em;
            background-repeat: no-repeat;
          }
        }

        .select {
          margin-top: 9px;

          .react-select__control,
          .react-select__control--is-focused {
            border: 1px solid #ddd;
            box-shadow: none;
            color: #666;
            border-radius: 4px;
            padding: 13px 15px;
            font-size: 16px;

            &.error {
              border: 1px solid #de3b3b;
            }
          }

          .react-select__value-container {
            margin: 0;
            padding: 0;

            div,
            input {
              margin: 0;
              padding: 0;
              color: #666;
              font-weight: normal;
            }

            .react-select__placeholder {
              color: #999;
            }
          }

          .react-select__indicator-separator {
            display: none;
          }

          .react-select__indicator {
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
`;

export const Avatar = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  padding: 7px;
  border-radius: 50%;
  color: ${props => props.color};
  background: ${props => transparentize(0.8, props.color)};
  margin-right: 5px;
  font-size: 15px;
  line-height: 20px;
  position: relative;
  text-align: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
