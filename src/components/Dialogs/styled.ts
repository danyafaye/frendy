import styled from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

export const DialogsWrapper = styled(motion.div)`
  background-color: ${COLORS.$white100};
  border-radius: 10px;
  display: flex;
  column-gap: 10px;
  height: 100%;
`;

export const DialogsLeftSide = styled.div`
  padding: 24px;
  flex-basis: 20%;
`;

export const DialogsRightSide = styled.div`
  border-left: 1px solid #d5dadd;
  padding: 24px;
  flex-basis: 80%;
`;
