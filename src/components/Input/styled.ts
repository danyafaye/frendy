import styled, { css } from 'styled-components';

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
          color: #82616c;
          transition: all 0.3s ease-in-out;
          padding: 5px 10px;
          &:hover {
            color: #82616c;
          }
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
          background-color: white;
          color: black;
        `;
    }
  }};
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #82616c;
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
