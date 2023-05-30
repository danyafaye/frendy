type UsersDTO = {
  email: string;
  id: string;
  isConfirmedEmail: boolean;
  firstName: string;
  updatedAt: string;
  createdAt: string;
  lastName: string;
  avatar: string;
  modelAvatar: string;
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

type CreateUserPostRequestDTO = FormData;

type EditUserPostRequestDTO = {
  text: string;
  id: string;
};

type UsersSearchRequestDTO = {
  query: string;
};

type UploadUserFileDTO = {
  message: string;
  url: string;
};

type UploadUserFileRequestDTO = FormData;

export type {
  UsersDTO,
  ChangePersonalInfoRequestDTO,
  ChangePersonalInfoDTO,
  ChangePasswordRequestDTO,
  UserPostsDTO,
  UserPostsRequestDTO,
  CreateUserPostRequestDTO,
  EditUserPostRequestDTO,
  UsersSearchRequestDTO,
  UploadUserFileDTO,
  UploadUserFileRequestDTO,
};
