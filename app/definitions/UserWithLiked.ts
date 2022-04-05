import User from './User';
import ViewedUser from './ViewedUser';

type UserWithLiked = User & {
  isLiked: boolean;
};

export default UserWithLiked;
