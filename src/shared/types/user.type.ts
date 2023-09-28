import { UserType } from './user-type.type.js';

export type User = {
  username: string;
  email: string;
  password: string;
  avatarPath: string;
  type: UserType;
}
