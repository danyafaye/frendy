import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const ProfileWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 0 20px;
  height: 100%;
`;

export const ProfileBlock = styled.div`
  border-radius: 10px;
  border: 1px solid ${COLORS.$purple50};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;
