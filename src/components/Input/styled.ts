import styled, { css } from 'styled-components';

import { COLORS } from '@src/constants/styles';

import { InputProps } from '@components/Input/Input';

export const Input = styled.input<Partial<InputProps>>`
  border: 1px solid #82616c;
  border-radius: 10px;
  ${(props) => {
    switch (props.inputSize) {
      case 'lg':
        return css`
          width: 590px;
          height: 55px;
          font-size: 24px;
          font-weight: 300;
          color: ${COLORS.$purple50};
          padding: 5px 10px;
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

export const InputRightIcon = styled.div`
  position: absolute;
  right: 15px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
`;
