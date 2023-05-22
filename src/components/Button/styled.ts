import styled, { css } from 'styled-components';

import { COLORS } from '@src/constants/styles';

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
          background-color: ${COLORS.$white100};
          color: ${COLORS.$black100};
        `;
    }
  }}
  ${(props) => {
    switch (props.decoration) {
      case 'default':
        return css`
          color: ${COLORS.$gray90};
          transition: all 0.3s ease-in-out;
          font-weight: 300;
          &:hover {
            color: ${COLORS.$purple50};
          }
        `;
      case 'filled':
        return css`
          color: white;
          background-color: ${COLORS.$purple50};
          border-radius: 10px;
          padding: 12px;
          font-weight: 300;
        `;
      case 'underlined':
        return css`
          color: ${COLORS.$purple50};
          text-decoration-line: underline;
          font-size: 24px;
          font-weight: 300;
        `;
      default:
        return css`
          color: ${COLORS.$gray90};
          transition: all 0.3s ease-in-out;
          font-weight: 300;
          &:hover {
            color: ${COLORS.$purple50};
          }
        `;
    }
  }}
`;
