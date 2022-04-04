import ViewedUser from "../definitions/ViewedUser";
import pool from '../helpers/getPgPool';

const updateViewedUser = async (id: string, isLiked: boolean): Promise<ViewedUser> => {
  const query = `UPDATE ViewedUsers
  SET is_like= ${isLiked ? 'TRUE' : 'FALSE'}
  WHERE id='${id}' RETURNING *;`;

  console.debug('updateViewedUser query: ', query);

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    throw new Error(`Cannot create a viewed user with ${ id }, ${ isLiked }`);
  }

  const viewedUser = result.rows[0];

  return {
    id: viewedUser.id,
    userId: viewedUser['user_id'],
    viewedUserId: viewedUser['viewed_user_id'],
    isLike: viewedUser['is_like'],
  };
};

export default updateViewedUser;
