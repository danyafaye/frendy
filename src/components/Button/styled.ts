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
          font-weight: 300;
          color: ${COLORS.$gray90};
          transition: all 0.3s ease-in-out;
          &:hover {
            color: ${COLORS.$purple50};
          }
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
`;
