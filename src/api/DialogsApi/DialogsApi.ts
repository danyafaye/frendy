import { api } from '@api/BaseApi';
import {
  DialogsCreateDTO,
  DialogsCreateRequestDTO,
  DialogsDTO,
  MessagesDTO,
} from '@api/DialogsApi/models';

const DialogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDialogs: build.query<DialogsDTO[], void>({
      query: () => ({
        url: `/dialogs`,
      }),
    }),
    getMessages: build.query<MessagesDTO[], { id: string }>({
      query: ({ id }) => ({
        url: `/dialogs/${id}`,
      }),
    }),
    createDialogs: build.mutation<DialogsCreateDTO[], DialogsCreateRequestDTO>({
      query: (dto) => ({
        url: '/dialogs/create',
        body: dto,
        method: 'post',
      }),
    }),
  }),
});

export const {} = DialogsApi;

export { DialogsApi };
