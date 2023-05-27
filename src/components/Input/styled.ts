import styled, { css } from 'styled-components';

import { COLORS } from '@src/constants/styles';

import { InputProps } from '@components/Input/Input';

export const Input = styled.input<Partial<InputProps>>`
  ${(props) => {
    switch (props.inputSize) {
      case 'lg':
        return css`
          width: 100%;
          font-size: 24px;
          font-weight: 300;
          color: ${COLORS.$gray90};
          &::placeholder {
            opacity: 0.35;
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
  }};
  ${(props) => {
    switch (props.decoration) {
      case 'filled':
        return css`
          border: 1px solid #d5dadd;
          border-radius: 8px;
          padding: 5px 10px;
          transition: border 0.3s ease-in-out;
          &:hover {
            border: 1px solid ${COLORS.$purple50};
          }
        `;
      case 'underlined':
        return css`
          border-bottom: 1px solid ${COLORS.$purple50};
          height: 55px;
          padding: 5px 10px;
        `;
      default:
        return css`
          border-bottom: 1px solid ${COLORS.$purple50};
          height: 55px;
          padding: 5px 10px;
        `;
    }
  }}
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${COLORS.$purple50};
  font-size: 24px;
  gap: 5px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputRightIcon = styled.div<Partial<InputProps>>`
  position: absolute;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  fill: ${COLORS.$purple50};
  ${(props) => {
    switch (props.decoration) {
      case 'underlined':
        return css`
          height: 55px;
        `;
      case 'filled':
        return css``;
      default:
        return css`
          background-color: ${COLORS.$white100};
          color: ${COLORS.$black100};
        `;
    }
  }};
`;
