export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  expiresIn: number;
  subject: string;
  roles: string[];
};

export type RegisterUser = {
  id: number;
  username: string;
};

// svaret från Gateway när vi kontrollerar den befintliga cookien
export type CurrentUserResponse = {
  username: string;
  roles: string[];
};

// användarinformation som frontend sparar för att visa rätt sidor och meny
export type StoredUser = {
  username: string;
  subject: string;
  roles: string[];
  expiresIn?: number;
};
