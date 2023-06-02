import { createContext, useContext } from 'react';

import { DeletedMessageDTO, SendMessageDTO } from '@api/DialogsApi/models';

type SocketContextState = {
  connect: () => void;
  deleteMessage: (dto: DeletedMessageDTO) => void;
  readMessage: (dto: DeletedMessageDTO) => void;
  sendMessage: (dto: SendMessageDTO) => void;
  clearSocket: () => void;
  socket: React.MutableRefObject<WebSocket | undefined>;
};

const SocketContext = createContext({} as SocketContextState);

const useSocket = () => useContext(SocketContext);

export { SocketContext, useSocket };
