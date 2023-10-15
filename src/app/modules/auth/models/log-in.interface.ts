import { User } from '@users/models/user.interface';

export interface LogInInterface {
  email: string;
  password: string;
}

export interface LogInResponseInterface {
  token: string;
  user: User;
}
