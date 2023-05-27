import { api } from '@api/BaseApi';
import {
  ChangePasswordRequestDTO,
  ChangePersonalInfoDTO,
  ChangePersonalInfoRequestDTO,
  CreateUserPostRequestDTO,
  UserPostsDTO,
  UserPostsRequestDTO,
  UsersDTO,
} from '@api/UsersApi/models';

const UsersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersDTO[], void>({
      query: (dto) => ({
        url: '/users',
        body: dto,
      }),
    }),
    getPersonalInfo: build.query<UsersDTO, void>({
      query: (dto) => ({
        url: '/users/me',
        body: dto,
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
        url: '/posts',
        options: dto,
      }),
    }),
    createUserPost: build.mutation<void, CreateUserPostRequestDTO>({
      query: (dto) => ({
        url: '/posts/create',
        body: dto,
        method: 'post',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetPersonalInfoQuery,
  useChangeUserPersonalInfoMutation,
  useChangeUserPasswordMutation,
  useLazyGetUserPostsQuery,
  useGetUserPostsQuery,
  useCreateUserPostMutation,
} = UsersApi;

export { UsersApi };
