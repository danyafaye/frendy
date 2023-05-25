type LoginRequestDTO = {
  email: string;
  password: string;
};

type AuthResponseDTO = {
  accessToken: string;
  refreshToken: string;
};

type RegistrationRequestDTO = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type RefreshRequestDTO = {
  refreshToken: string;
};

export type { LoginRequestDTO, AuthResponseDTO, RegistrationRequestDTO, RefreshRequestDTO };
