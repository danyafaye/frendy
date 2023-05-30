import styled from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as EyeIcon } from '@assets/icons/eye.svg';
import { ReactComponent as EyeCloseIcon } from '@assets/icons/eyeClose.svg';

export const SettingsWrapper = styled(motion.div)`
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
  background-color: ${COLORS.$white100};
  height: 100%;
  border-radius: 10px;
  padding: 24px;
  row-gap: 27px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const SettingsBlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  row-gap: 20px;
  column-gap: 27px;
`;

export const SettingsBlock = styled.div`
  border: 1px solid #d5dadd;
  border-radius: 8px;
  padding: 28px;
  flex: 1 280px;
  max-width: 100%;
  box-sizing: border-box;
  row-gap: 4px;
  display: flex;
  flex-direction: column;
  transition: border 0.3s ease-in-out;
  font-size: 18px;
  &:hover {
    border: 1px solid ${COLORS.$purple50};
  }
`;

export const SettingsTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const EyeIconStyled = styled(EyeIcon)`
  cursor: pointer;
`;

export const EyeCloseIconStyled = styled(EyeCloseIcon)`
  cursor: pointer;
`;
