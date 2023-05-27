type UsersDTO = {
  email: string;
  id: string;
  isConfirmedEmail: boolean;
  firstName: string;
  updatedAt: string;
  createdAt: string;
  lastName: string;
  avatar: string;
};

type ChangePersonalInfoRequestDTO = {
  firstName: string;
  lastName: string;
};

type ChangePersonalInfoDTO = {
  message: string;
  user: UsersDTO;
};

type ChangePasswordRequestDTO = {
  password: string;
  newPassword: string;
};

export type {
  UsersDTO,
  ChangePersonalInfoRequestDTO,
  ChangePersonalInfoDTO,
  ChangePasswordRequestDTO,
};
