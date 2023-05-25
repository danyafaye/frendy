import { api } from '@api/BaseApi';
import { UsersDTO } from '@api/UsersApi/models';

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
  }),
});

export const { useGetUsersQuery, useLazyGetPersonalInfoQuery } = UsersApi;

export { UsersApi };
