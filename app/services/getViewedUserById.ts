import ViewedUser from '../definitions/ViewedUser';
import pool from '../helpers/getPgPool';

const getViewedUserById = async (id: string): Promise<ViewedUser | undefined> => {
  const query = `SELECT * FROM ViewedUsers WHERE id='${id}'`;

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

export default getViewedUserById;
