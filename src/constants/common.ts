import * as Yup from 'yup';

export const AUTH_TOKEN = 'token';
export const AUTH_REFRESH_TOKEN = 'refresh-token';

export const BASE_API_URL = 'http://62.217.179.254:5000';

export const AUTH_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Неправильная электронная почта'),
});
