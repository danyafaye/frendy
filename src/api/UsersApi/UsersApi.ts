import { api } from '@api/BaseApi';
import {
  ChangePasswordRequestDTO,
  ChangePersonalInfoDTO,
  ChangePersonalInfoRequestDTO,
  CreateUserPostRequestDTO,
  EditUserPostRequestDTO,
  UserPostsDTO,
  UserPostsRequestDTO,
  UsersDTO,
  UsersSearchRequestDTO,
  UploadUserFileDTO,
  UploadUserFileRequestDTO,
} from '@api/UsersApi/models';

const UsersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsersList: build.query<UsersDTO[], UsersSearchRequestDTO>({
      query: (dto) => ({
        url: `/users?search=${dto.query}`,
      }),
    }),
    getUser: build.query<UsersDTO[], UsersSearchRequestDTO>({
      query: (dto) => ({
        url: `/users?id=${dto.query}`,
      }),
    }),
    getPersonalInfo: build.query<UsersDTO, void>({
      query: () => ({
        url: '/users/me',
      }),
    }),
    uploadUserModel: build.mutation<UploadUserFileDTO, UploadUserFileRequestDTO>({
      query: (dto) => ({
        url: '/users/modelAvatar',
        body: dto,
        method: 'post',
      }),
    }),
    uploadUserAvatar: build.mutation<UploadUserFileDTO, UploadUserFileRequestDTO>({
      query: (dto) => ({
        url: '/users/avatar',
        body: dto,
        method: 'post',
      }),
    }),
    changeUserPersonalInfo: build.mutation<ChangePersonalInfoDTO, ChangePersonalInfoRequestDTO>({
      query: (dto) => ({
        url: '/users/change/info',
        body: dto,
        method: 'post',
      }),
    }),
    changeUserPassword: build.mutation<void, ChangePasswordRequestDTO>({
      query: (dto) => ({
        url: '/users/change/password',
        body: dto,
        method: 'post',
      }),
    }),
    getUserPosts: build.query<UserPostsDTO[], UserPostsRequestDTO>({
      query: (dto) => ({
        url: `/posts?user_id=${dto.user_id}`,
      }),
    }),
    createUserPost: build.mutation<void, CreateUserPostRequestDTO>({
      query: (dto) => ({
        url: '/posts/create',
        body: dto,
        method: 'post',
      }),
    }),
    deleteUserPost: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'delete',
      }),
    }),
    editUserPost: build.mutation<void, EditUserPostRequestDTO>({
      query: (dto) => ({
        url: `/posts/${dto.id}`,
        body: { text: dto.text },
        method: 'put',
      }),
    }),
  }),
});

export const {
  useLazyGetUsersListQuery,
  useLazyGetPersonalInfoQuery,
  useChangeUserPersonalInfoMutation,
  useChangeUserPasswordMutation,
  useLazyGetUserPostsQuery,
  useGetUserPostsQuery,
  useCreateUserPostMutation,
  useDeleteUserPostMutation,
  useEditUserPostMutation,
  useLazyGetUserQuery,
  useUploadUserModelMutation,
  useUploadUserAvatarMutation,
} = UsersApi;

export { UsersApi };
