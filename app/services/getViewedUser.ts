import pool from '../helpers/getPgPool';
import ViewedUser from "../definitions/ViewedUser";

const getViewedUser = async (userId: string, viewedUserId: string, isLike?: boolean): Promise<ViewedUser | undefined> => {
  let query = `SELECT * FROM ViewedUsers WHERE user_id='${userId}' AND viewed_user_id='${viewedUserId}' AND is_like=${isLike ? 'TRUE' : 'FALSE'}`;

  if (isLike === undefined) {
    query = `SELECT * FROM ViewedUsers WHERE user_id='${userId}' AND viewed_user_id='${viewedUserId}'`;
  }

  console.debug('getViewedUserById query: ', query);
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return;
  }

  const viewedUser = result.rows[0];
  return {
    id: viewedUser.id,
    userId: viewedUser['user_id'],
    viewedUserId: viewedUser['viewed_user_id'],
    isLike: viewedUser['is_like'],
  };
};

export default getViewedUser;
