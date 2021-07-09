import { User } from '../_models/user';

export interface JwtPayload {
  user: User;
}
