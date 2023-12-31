export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
}
