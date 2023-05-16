import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: ${COLORS.$white20};
  height: 68px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 146px;
  height: 39px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  column-gap: 16px;
`;
