import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

import { ButtonProps } from '@components/Button/Button';

export const Button = styled(motion.button)<Partial<ButtonProps>>`
  background: none;
  ${(props) => {
    switch (props.size) {
      case 'lg':
        return css`
          font-size: 30px;
          font-weight: 300;
        `;
      case 'sm':
        return css`
          font-size: 18px;
          font-weight: 400;
        `;
      case 'md':
        return css`
          font-size: 24px;
          font-weight: 300;
        `;
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
          transition: color 0.3s ease-in-out;
          &:hover {
            color: ${COLORS.$purple50};
          }
        `;
      case 'filled':
        return css`
          color: white;
          background-color: ${COLORS.$purple50};
          border-radius: 5px;
          transition: background-color 0.3s ease-in-out;
          padding: 12px;
          &:hover {
            background-color: rgba(133, 107, 114, 0.85);
          }
        `;
      case 'underlined':
        return css`
          color: ${COLORS.$purple50};
          text-decoration-line: underline;
          font-size: 24px;
        `;
      default:
        return css`
          color: ${COLORS.$gray90};
          font-weight: 300;
          transition: color 0.3s ease-in-out;
          &:hover {
            color: ${COLORS.$purple50};
          }
        `;
    }
  }}
`;
