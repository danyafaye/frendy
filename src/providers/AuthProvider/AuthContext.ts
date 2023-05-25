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
};

const AuthContext = createContext({} as AuthContextState);

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
