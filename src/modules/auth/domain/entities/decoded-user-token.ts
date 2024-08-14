import { UserRole } from 'src/modules/user/domain/enums/user-role';

export type DecodedUserToken = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};
