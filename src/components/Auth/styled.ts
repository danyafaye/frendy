import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as EyeIcon } from '@assets/icons/eye.svg';
import { ReactComponent as EyeCloseIcon } from '@assets/icons/eyeClose.svg';
export const AuthPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLORS.$purple50};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 55px;
  gap: 96px;
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
