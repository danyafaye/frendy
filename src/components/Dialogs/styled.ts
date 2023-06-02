import styled from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as ChatIcon } from '@assets/icons/chat_icon.svg';

export const DialogsWrapper = styled(motion.div)`
  background-color: ${COLORS.$white100};
  border-radius: 10px;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export const DialogsLeftSide = styled.div`
  padding: 24px;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-y: auto;
`;

export const MinifiedDialog = styled.div<{ active: boolean }>`
  display: flex;
  border: 1px solid #d5dadd;
  border-radius: 8px;
  column-gap: 10px;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
  align-items: center;
  max-width: 280px;
  padding: 8px;
  min-height: 65px;
  cursor: pointer;
  transition: border 0.2s ease-in-out;
  &:hover {
    border: 1px solid ${COLORS.$purple50};
  }
  ${(props) => props.active && `border: 1px solid ${COLORS.$purple50};`}
`;

export const MinifiedHeader = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const MinifiedContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: flex-start;
  width: 60%;
`;

export const MinifiedAdditional = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 4px;
`;

export const MinifiedDateTime = styled.div`
  font-size: 13px;
  color: #8a8a8a;
`;

export const MinifiedUnreadMessage = styled.div`
  font-size: 11px;
  color: ${COLORS.$gray90};
  background-color: #bbbbbb;
  padding: 3px 6px;
  border-radius: 18px;
`;

export const MinifiedAvatar = styled.img`
  border-radius: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid ${COLORS.$purple50};
`;
export const MinifiedMessage = styled.div`
  font-size: 13px;
  color: #8a8a8a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const DialogsRightSide = styled.div`
  border-left: 1px solid #d5dadd;
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ChatPlug = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
  row-gap: 10px;
  color: #8a8a8a;
`;

export const ChatPlugIcon = styled(ChatIcon)`
  width: 64px;
  height: 64px;
  fill: #8a8a8a;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px 24px 10px;
  flex-grow: 1;
  width: 63.9vw;
  overflow: auto;
`;

export const Message = styled.div<{ side: 'right' | 'left' }>`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-self: flex-start; //TODO: изменить при пропсах
  background-color: #e0d7da;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
  word-wrap: break-word;
  overflow-y: auto;
  ${(props) =>
    props.side === 'right' &&
    `
    cursor: pointer;
    transition: background-color .3s ease-in-out;
    &:hover {
      background-color: ${COLORS.$purple50}
  `}
`;

export const MessageContent = styled.div<{ side: 'left' | 'right' }>`
  display: flex;
  column-gap: 10px;
  font-size: 15px;
  align-items: center;
  max-width: calc(50% - 10px);
  width: fit-content;
  height: fit-content;
  position: relative;
  ${(props) =>
    props.side === 'left'
      ? `align-self: flex-start; align-items: flex-start;`
      : `align-self: flex-end; align-items: flex-start;`}
`;

export const MessageDateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MessageDate = styled.span`
  font-size: 12px;
  color: #8a8a8a;
`;
export const MessageTime = styled.span`
  font-size: 12px;
  color: #8a8a8a;
`;

export const MessageHeader = styled.div`
  background-color: ${COLORS.$white80};
  width: 100%;
  padding: 24px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;
`;

export const MessageHeaderContent = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  padding: 10px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;
  background-color: ${COLORS.$white80};
`;

export const DeleteMessageWindow = styled.div<{ openDialog: boolean }>`
  position: absolute;
  display: flex;
  background-color: #60585c;
  padding: 10px;
  border-radius: 8px;
  color: white;
  right: 24%;
  bottom: 106%;
  transition: background-color.3s ease-in-out;
  ${(props) =>
    props.openDialog
      ? `
    display: flex;
  `
      : `
    display: none;
  `}
  &:hover {
    cursor: pointer;
    background-color: ${COLORS.$purple50};
  }
`;
