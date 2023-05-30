import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const SearchWrapper = styled.div`
  position: relative;
`;

export const AutoCompleteWrapper = styled.ul`
  background-color: ${COLORS.$white100};
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  border: 1px solid #d5dadd;
  z-index: 5;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
  max-height: 300px;
  height: auto;
  overflow: auto;
`;

export const AutoComplete = styled.li`
  display: flex;
  align-items: center;
  column-gap: 10px;
  list-style: none;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.$white80};
  }
`;

export const SearchAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;
