import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from '@src/constants/common';
import { useAuth } from '@src/providers/AuthProvider';
import { LINKS } from '@src/links';

import { useRefreshMutation } from '@api/AuthApi/AuthApi';
import { AuthResponseDTO } from '@api/AuthApi';
import { DeletedMessageDTO, SendMessageDTO } from '@api/DialogsApi/models';

import { useToast } from '@hooks/useToast';

import { MessageEvents } from '@components/Dialogs/Dialogs';

import { SocketContext } from './SocketContext';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [lastSendedMessage, setLastSendedMessage] = useState<string>();
  const [refresh] = useRefreshMutation();
  const socket = useRef<WebSocket>();
  const toast = useToast();
  const location = useLocation();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth && !socket.current) {
      connect();
    } else if (socket.current) {
      clearSocket();
    }
  }, [isAuth]);

  const connect = () => {
    socket.current = new WebSocket('ws://62.217.179.254:4000');
    socket.current.onopen = () => {
      console.log('socket: open');
      const message = {
        token: localStorage.getItem(AUTH_TOKEN),
        event: MessageEvents.CONNECTION,
      };
      setLastSendedMessage(JSON.stringify(message));
      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onclose = () => {
      connect();
    };

    socket.current.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      if (message.event === MessageEvents.ERROR && message.status === 401) {
        const res = refresh({ refreshToken: localStorage.getItem(AUTH_REFRESH_TOKEN) || '' });
        if ('data' in res) {
          const { accessToken, refreshToken } = res.data as AuthResponseDTO;
          localStorage.setItem(AUTH_REFRESH_TOKEN, refreshToken);
          localStorage.setItem(AUTH_TOKEN, accessToken);
          if (lastSendedMessage) {
            socket.current?.send({ ...JSON.parse(lastSendedMessage), token: accessToken });
            setLastSendedMessage(undefined);
          }
        }
      }
    };

    socket.current.onerror = (e) => {
      console.log(e);
    };
  };

  const deleteMessage = (dto: DeletedMessageDTO) => {
    if (!socket) {
      connect();
    }
    const message = {
      event: MessageEvents.DELETE_MESSAGE,
      token: localStorage.getItem(AUTH_TOKEN),
      ...dto,
    };
    setLastSendedMessage(JSON.stringify(message));
    socket.current?.send(JSON.stringify(message));
  };

  const readMessage = (dto: DeletedMessageDTO) => {
    if (!socket) {
      connect();
    }
    const message = {
      event: MessageEvents.READ_MESSAGE,
      token: localStorage.getItem(AUTH_TOKEN),
      ...dto,
    };
    setLastSendedMessage(JSON.stringify(message));
    socket.current?.send(JSON.stringify(message));
  };

  const clearSocket = () => {
    socket.current?.close();
  };

  const sendMessage = (dto: SendMessageDTO) => {
    if (!socket) {
      connect();
    }
    const message = {
      event: MessageEvents.MESSAGE,
      token: localStorage.getItem(AUTH_TOKEN),
      ...dto,
    };
    setLastSendedMessage(JSON.stringify(message));
    socket.current?.send(JSON.stringify(message));
  };

  useEffect(() => {
    if (location.pathname !== LINKS.dialogs && isAuth) {
      const handleMessage = (event: MessageEvent) => {
        const { data } = event;
        const message = JSON.parse(data);
        if (message?.event === MessageEvents.MESSAGE) {
          toast.defaultToast({
            text: `${message.user.firstName} ${message.user.lastName}: ${message.text}`,
          });
        }
      };
      socket.current?.addEventListener('message', handleMessage);

      return () => {
        socket.current?.removeEventListener('message', handleMessage);
      };
    }
  }, [isAuth, location]);

  return (
    <SocketContext.Provider
      value={{
        connect,
        deleteMessage,
        readMessage,
        sendMessage,
        clearSocket,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
