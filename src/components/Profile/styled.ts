import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const ProfileWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const ProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileContentWrapper = styled.div`
  flex-basis: 85%;
  background-color: ${COLORS.$white20};
  padding: 20px;
`;

export const ProfileSidebarBlock = styled(ProfileBlock)`
  flex-basis: 15%;
  border-radius: 10px;
  padding: 24px;
  position: sticky;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
`;

export const ProfileContentBlock = styled(ProfileBlock)``;
