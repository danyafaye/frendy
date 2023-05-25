import { api } from '@api/BaseApi';
import {
  AuthResponseDTO,
  LoginRequestDTO,
  RefreshRequestDTO,
  RegistrationRequestDTO,
} from '@api/AuthApi/models';

const AuthApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponseDTO, LoginRequestDTO>({
      query: (dto) => ({
        url: '/auth/login',
        body: dto,
        method: 'post',
      }),
    }),
    register: build.mutation<AuthResponseDTO, RegistrationRequestDTO>({
      query: (dto) => ({
        url: '/auth/registration',
        body: dto,
        method: 'post',
      }),
    }),
    refresh: build.mutation<AuthResponseDTO, RefreshRequestDTO>({
      query: (dto) => ({
        url: '/auth/refresh',
        body: dto,
        method: 'post',
      }),
    }),
  }),
});

export const { useRefreshMutation, useRegisterMutation, useLoginMutation } = AuthApi;

export { AuthApi };
