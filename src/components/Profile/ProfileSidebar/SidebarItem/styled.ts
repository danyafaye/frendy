import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const SidebarItemWrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  color: ${COLORS.$gray90};
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.$purple50};
  }
`;
