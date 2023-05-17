import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const ProfileWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 20px;
  height: 100%;
`;

export const ProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileSidebarBlock = styled(ProfileBlock)`
  padding: 20px;
  flex-basis: 10%;
  border-radius: 10px;
  border: 1px solid ${COLORS.$purple50};
  row-gap: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ProfileContentBlock = styled(ProfileBlock)`
  flex-basis: 90%;
`;
