import User from './User';

type UserWithToken = User & {
  token: string;
};

export default UserWithToken;
