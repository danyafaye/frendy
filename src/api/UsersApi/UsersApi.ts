import { api } from '@api/BaseApi';
import {
  ChangePasswordRequestDTO,
  ChangePersonalInfoDTO,
  ChangePersonalInfoRequestDTO,
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
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetPersonalInfoQuery,
  useChangeUserPersonalInfoMutation,
  useChangeUserPasswordMutation,
} = UsersApi;

export { UsersApi };
