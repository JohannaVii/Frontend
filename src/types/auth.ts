export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  expiresIn: number;
  subject: string;
  roles: string[];
};
