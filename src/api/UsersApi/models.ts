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

type UserPostsRequestDTO = {
  user_id: string;
};

type UserPostsDTO = {
  id: string;
  updatedAt: string;
  createdAt: string;
  text: string;
  attached: string;
  status: string;
  user: UsersDTO;
};

type CreateUserPostRequestDTO = {
  text?: string;
  attached?: string;
};

export type {
  UsersDTO,
  ChangePersonalInfoRequestDTO,
  ChangePersonalInfoDTO,
  ChangePasswordRequestDTO,
  UserPostsDTO,
  UserPostsRequestDTO,
  CreateUserPostRequestDTO,
};
