import { v4 } from 'uuid';

import ViewedUser from "../definitions/ViewedUser";
import pool from '../helpers/getPgPool';

const createViewedUser = async (userId: string, viewedUserId: string, isLiked: boolean): Promise<ViewedUser> => {
  const query = `INSERT INTO ViewedUsers (id, user_id, viewed_user_id, is_like)
  VALUES ('${ v4() }', '${ userId }', '${ viewedUserId }', ${isLiked ? 'TRUE' : 'FALSE'}) RETURNING *;`;

  console.debug('createViewedUser query: ', query);

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    throw new Error(`Cannot create a viewed user with ${ userId }, ${ viewedUserId }`);
  }

  const viewedUser = result.rows[0];

  return {
    id: viewedUser.id,
    userId: viewedUser['user_id'],
    viewedUserId: viewedUser['viewed_user_id'],
    isLike: viewedUser['is_like'],
  };
};

export default createViewedUser;
