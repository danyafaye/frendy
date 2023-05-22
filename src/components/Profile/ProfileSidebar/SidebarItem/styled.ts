import styled, { css } from 'styled-components';

import { COLORS } from '@src/constants/styles';

type WrapperProps = {
  isActive: boolean;
};

export const SidebarItemWrapper = styled.div<WrapperProps>`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
  font-size: 18px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  color: ${COLORS.$gray90};
  cursor: pointer;
  &:hover {
    background-color: rgba(130, 97, 108, 0.1);
  }
  ${(props) => {
    if (props.isActive) {
      return css`
        background-color: rgba(130, 97, 108, 0.4);
        font-weight: 500;
        &:hover {
          background-color: rgba(130, 97, 108, 0.4);
        }
      `;
    }
  }}
`;
