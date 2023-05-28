import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: ${COLORS.$white100};
  height: 68px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  z-index: 3;
`;

export const Logo = styled.img`
  width: 146px;
  height: 39px;
  cursor: pointer;
`;

export const HeaderButtons = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const HeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  font-weight: 300;
  column-gap: 6px;
  color: ${COLORS.$gray90};
`;

export const HeaderAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;

export const SearchWrapper = styled.div``;
