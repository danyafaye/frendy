import styled, { css } from 'styled-components';

import { ButtonProps } from '@components/Button/Button';

export const Button = styled.button<Partial<ButtonProps>>`
  background: none;
  ${(props) => {
    switch (props.size) {
      case 'lg':
        return css`
          font-size: 30px;
        `;
      case 'sm':
        return css``;
      case 'md':
        return css``;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}
  ${(props) => {
    switch (props.decoration) {
      case 'default':
        return css`
          color: #222222;
          transition: all 0.3s ease-in-out;
          font-weight: 300;
          &:hover {
            color: #82616c;
          }
        `;
      case 'filled':
        return css`
          color: white;
          background-color: #82616c;
          border-radius: 10px;
          padding: 12px;
          font-weight: 300;
        `;
      case 'underlined':
        return css`
          color: #82616c;
          text-decoration-line: underline;
          font-size: 24px;
          font-weight: 300;
        `;
      default:
        return css`
          color: #222222;
          transition: all 0.3s ease-in-out;
          font-weight: 300;
          &:hover {
            color: #82616c;
          }
        `;
    }
  }}
`;
