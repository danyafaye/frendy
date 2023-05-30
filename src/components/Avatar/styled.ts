import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const AvatarWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const AvatarContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: center;
  justify-items: center;
`;

export const AvatarContentBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 16px;
`;

export const AvatarEmptyPlug = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #d3d3d3;
`;

export const AvatarModel = styled.div`
  overflow: hidden;
  border-radius: 10px;
  height: 272px;
  width: 272px;
  border: 1px solid ${COLORS.$purple50};
`;

export const AvatarImage = styled.img`
  overflow: hidden;
  border-radius: 10px;
  height: 272px;
  width: 272px;
  border: 1px solid ${COLORS.$purple50};
`;

export const AvatarControls = styled.div``;
