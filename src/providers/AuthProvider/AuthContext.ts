import { createContext, useContext } from 'react';

import { UsersDTO } from '@api/UsersApi';

type AuthContextState = {
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registration: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  userInfo: UsersDTO;
  getProfile: () => Promise<void>;
  updateUserInfoField: (name: string, value: string | boolean) => void;
};

const AuthContext = createContext({} as AuthContextState);

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
