type DialogsUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type MessageType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  dialogId: string;
  text: string;
  read: boolean;
  user: DialogsUser;
};

type DialogsCreateRequestDTO = {
  text: string;
  userId: string;
};

type DialogsCreateDTO = {
  id: string;
  users: DialogsUser[];
  messages: MessageType[];
};

type DialogsDTO = {
  id: string;
  user: DialogsUser;
  lastMessage: MessageType;
  unreadableMessages: number;
};

type MessagesDTO = {
  id: string;
  users: DialogsUser[];
  messages: MessageType[];
};

export type { DialogsCreateRequestDTO, DialogsDTO, MessagesDTO, DialogsCreateDTO };
