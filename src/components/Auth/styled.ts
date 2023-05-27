import styled from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as EyeIcon } from '@assets/icons/eye.svg';
import { ReactComponent as EyeCloseIcon } from '@assets/icons/eyeClose.svg';
export const AuthPageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f6f8f9;
`;

export const AuthForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background-color: ${COLORS.$white100};
  padding: 55px;
  gap: 96px;
  width: 36.6%;
`;

export const ControlWrapper = styled.div`
  display: flex;
  gap: 28px;
  flex-direction: column;
`;

export const EyeIconStyled = styled(EyeIcon)`
  cursor: pointer;
`;

export const EyeCloseIconStyled = styled(EyeCloseIcon)`
  cursor: pointer;
`;
