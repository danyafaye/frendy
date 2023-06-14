import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { format } from 'date-fns';

import { useAuth } from '@src/providers/AuthProvider';
import { LINKS } from '@src/links';
import { useSocket } from '@src/providers/SocketProvider';

import { useLazyGetDialogsQuery, useLazyGetMessagesQuery } from '@api/DialogsApi/DialogsApi';
import { DialogsDTO, MessagesDTO } from '@api/DialogsApi/models';

import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import HeaderTemplate from '@assets/header_template.png';

import * as ST from './styled';

export enum MessageEvents {
  CONNECTION = 'connection',
  MESSAGE = 'message',
  READ_MESSAGE = 'readMessage',
  ERROR = 'error',
  DELETE_MESSAGE = 'deleteMessage',
}

const Dialogs: FC = () => {
  const { userInfo } = useAuth();
  const { sendMessage, socket, deleteMessage, readMessage } = useSocket();
  const navigate = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams(window.location.search);

  const [dialogs, setDialogs] = useState<DialogsDTO[]>([]);
  const [messages, setMessages] = useState<MessagesDTO>({ id: '', messages: [], users: [] });
  const [messageIsOpen, setMessageIsOpen] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const [openDialogId, setOpenDialogId] = useState<string>('');
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const dialogModal = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);

  const dialogId = params.get('id');
  const today = new Date().toLocaleDateString();
  const messagesUser = useMemo(() => {
    return messages?.users.filter((user) => {
      return user.id !== userInfo.id;
    })[0];
  }, [messages]);

  const [getDialogs] = useLazyGetDialogsQuery();
  const [getMessages] = useLazyGetMessagesQuery();

  const getDialogsHandler = async () => {
    try {
      const res = await getDialogs();
      if ('error' in res) {
        toast.error(res.error);
      } else {
        setDialogs(res.data || []);
      }
    } catch (e) {
      throw e;
    }
  };

  const getMessagesHandler = async () => {
    try {
      if (dialogId) {
        const res = await getMessages({ id: dialogId });
        if ('error' in res) {
          toast.error(res.error);
        } else {
          setMessages(res.data as MessagesDTO);
          setMessageIsOpen(true);
        }
      }
    } catch (e) {
      throw e;
    }
  };

  const onDialogClick = (id: string) => {
    navigate(`${LINKS.dialogs}?id=${id}`);
  };

  const onCaptureClick = (e: React.MouseEvent<HTMLDivElement>, messageId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDialogId(messageId);
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  const onDeleteMessage = (id: string) => {
    deleteMessage({ messageId: id });
  };

  const onClickSendMessage = () => {
    sendMessage({ text: messageValue, dialogId: dialogId as string });
    setMessageValue('');
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage({ text: messageValue, dialogId: dialogId as string });
      setMessageValue('');
    }
  };
  const onHeaderClickHandler = () => {
    navigate(`${LINKS.profile}?id=${messagesUser.id}`);
  };

  useEffect(() => {
    getDialogsHandler();
  }, []);

  useEffect(() => {
    getMessagesHandler();
  }, [dialogId]);

  useEffect(() => {
    if (isAutoScroll) {
      messagesScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data } = event;
      const message = JSON.parse(data);
      if (message?.dialogId === dialogId && message?.event === MessageEvents.MESSAGE) {
        setMessages((prev) => {
          return {
            ...prev,
            messages: [...prev.messages, message],
          };
        });
        if (message.id !== userInfo.id) {
          readMessage({ messageId: message.id });
        }
      }
      if (message?.dialogId === dialogId && message?.event === MessageEvents.DELETE_MESSAGE) {
        setMessages((prev) => {
          return {
            ...prev,
            messages: prev.messages.filter((m) => m.id !== message.messageId),
          };
        });
      }
      if (message?.event === MessageEvents.MESSAGE) {
        setDialogs((prev) =>
          prev.map((dialog) => {
            if (dialog.id === message.dialogId) {
              return {
                ...dialog,
                lastMessage: message,
                unreadableMessages: message.read
                  ? dialog.unreadableMessages
                  : dialog.unreadableMessages + 1,
              };
            }
            return dialog;
          }),
        );
        if (message.dialogId !== dialogId) {
          toast.defaultToast({
            text: `${message.user.firstName} ${message.user.lastName}: ${message.text}`,
          });
        }
      }
    };
    socket.current?.addEventListener('message', handleMessage);

    return () => {
      socket.current?.removeEventListener('message', handleMessage);
    };
  }, [dialogId, messages, dialogs]);

  useEffect(() => {
    if (!openDialogId) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!dialogModal.current?.contains(e.target as Node)) {
        setOpenDialogId('');
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [openDialogId, dialogModal]);

  const renderMinifiedDialogs = useMemo(() => {
    return dialogs?.map((dialog, index) => {
      const postCreated = new Date(dialog.lastMessage.createdAt);
      return (
        <ST.MinifiedDialog
          key={index}
          onClick={() => onDialogClick(dialog.id)}
          active={dialog.id === dialogId}
        >
          {dialog.user.avatar ? (
            <ST.MinifiedAvatar src={dialog.user.avatar} />
          ) : (
            <ST.MinifiedAvatar src={HeaderTemplate} />
          )}
          <ST.MinifiedContent>
            <ST.MinifiedHeader>
              {dialog.user.firstName} {dialog.user.lastName}
            </ST.MinifiedHeader>
            <ST.MinifiedMessage>
              {dialog.lastMessage.user.id === userInfo.id ? (
                <>
                  <span>Вы:</span> {dialog.lastMessage.text}
                </>
              ) : (
                dialog.lastMessage.text
              )}
            </ST.MinifiedMessage>
          </ST.MinifiedContent>
          <ST.MinifiedAdditional>
            <ST.MinifiedDateTime>
              {today === postCreated.toLocaleDateString()
                ? postCreated.toLocaleTimeString().slice(0, -3)
                : format(postCreated, 'dd.MM')}
            </ST.MinifiedDateTime>
            {dialog.unreadableMessages !== 0 && (
              <ST.MinifiedUnreadMessage>{dialog.unreadableMessages}</ST.MinifiedUnreadMessage>
            )}
          </ST.MinifiedAdditional>
        </ST.MinifiedDialog>
      );
    });
  }, [dialogs, dialogId]);

  const renderMessages = useMemo(() => {
    return messages?.messages.map((message, index) => {
      const messageCreated = new Date(message?.createdAt);
      const side = message?.user.id === userInfo.id ? 'right' : 'left';
      setDialogs((prev) =>
        prev.map((dialog) => {
          if (dialog.id === message.dialogId) {
            return {
              ...dialog,
              unreadableMessages: 0,
            };
          }
          return dialog;
        }),
      );
      return (
        <ST.MessageContent
          ref={messagesScrollRef}
          key={index}
          side={side}
          onContextMenu={(e) => onCaptureClick(e, message?.id)}
        >
          {side === 'left' ? (
            <>
              {message.user?.avatar ? (
                <ST.MinifiedAvatar src={message.user?.avatar} />
              ) : (
                <ST.MinifiedAvatar src={HeaderTemplate} />
              )}
              <ST.Message side={side}>{message.text}</ST.Message>
              <ST.MessageDateTime>
                <ST.MessageDate>{format(messageCreated, 'dd.MM')}</ST.MessageDate>
                <ST.MessageTime>{messageCreated.toLocaleTimeString().slice(0, -3)}</ST.MessageTime>
              </ST.MessageDateTime>
            </>
          ) : (
            <>
              <ST.DeleteMessageWindow
                ref={dialogModal}
                openDialog={message.id === openDialogId}
                onClick={() => onDeleteMessage(message.id)}
              >
                Удалить
              </ST.DeleteMessageWindow>
              <ST.MessageDateTime>
                <ST.MessageDate>{format(messageCreated, 'dd.MM')}</ST.MessageDate>
                <ST.MessageTime>{messageCreated.toLocaleTimeString().slice(0, -3)}</ST.MessageTime>
              </ST.MessageDateTime>
              <ST.Message side={side}>{message.text}</ST.Message>

              {message.user.avatar ? (
                <ST.MinifiedAvatar src={message.user.avatar} />
              ) : (
                <ST.MinifiedAvatar src={HeaderTemplate} />
              )}
            </>
          )}
        </ST.MessageContent>
      );
    });
  }, [messages, messageIsOpen, openDialogId]);

  return (
    <ST.DialogsWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{
        hidden: { opacity: 0, x: +20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
      key="DIALOGS_WRAPPER"
    >
      {dialogs.length === 0 ? (
        <ST.DialogsPlug>
          Для того, чтобы начать диалог, найдите пользователя, и напишите ему ваше первое сообщение.
        </ST.DialogsPlug>
      ) : (
        <>
          <ST.DialogsLeftSide>{renderMinifiedDialogs}</ST.DialogsLeftSide>
          <ST.DialogsRightSide>
            {!messageIsOpen ? (
              <ST.ChatPlug>
                <ST.ChatPlugIcon />
                Выберите чат чтобы начать общение
              </ST.ChatPlug>
            ) : (
              <>
                <ST.MessageHeader onClick={onHeaderClickHandler}>
                  {messagesUser?.avatar ? (
                    <ST.MinifiedAvatar src={messagesUser?.avatar} />
                  ) : (
                    <ST.MinifiedAvatar src={HeaderTemplate} />
                  )}
                  <ST.MessageHeaderContent>
                    {messagesUser?.firstName} {messagesUser?.lastName}
                  </ST.MessageHeaderContent>
                </ST.MessageHeader>
                <ST.MessageWrapper onScroll={scrollHandler}>{renderMessages}</ST.MessageWrapper>
                <ST.InputWrapper>
                  <Input
                    inputSize="md"
                    decoration="filled"
                    placeholder="Написать сообщение..."
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    onKeyDown={onKeyPress}
                  />
                  <Button
                    decoration="default"
                    size="sm"
                    text="Отправить"
                    onClick={onClickSendMessage}
                  />
                </ST.InputWrapper>
              </>
            )}
          </ST.DialogsRightSide>
        </>
      )}
    </ST.DialogsWrapper>
  );
};

export { Dialogs };
