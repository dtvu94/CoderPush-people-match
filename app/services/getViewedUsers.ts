import _ from 'underscore';

import ViewedUser from '../definitions/ViewedUser';
import ListResponse from '../definitions/ListResponse';
import pool from '../helpers/getPgPool';

const getViewedUsers = async (
  page: number,
  limit: number,
  userId: string | undefined,
  viewedUserId: string | undefined,
): Promise<ListResponse<ViewedUser>> => {
  let query = 'SELECT id, user_id, viewed_user_id, is_like, COUNT(*) OVER() AS full_count FROM ViewedUsers';

  if (userId && viewedUserId) {
    query += ` WHERE user_id='${ userId }' AND viewed_user_id='${ viewedUserId }'`;
  }

  query += ' ORDER BY id ASC' +
    ` LIMIT ${ limit } OFFSET ${page * limit}`;

  console.debug('getViewedUsers query: ', query);
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    // query again to get the full count
    const queryCount = 'SELECT COUNT(id) FROM ViewedUsers';
    const countResult = await pool.query(queryCount);

    const response = {
      data: [],
      total: countResult.rows[0].count,
      page,
      limit,
    };

    return response;
  }

  // omit the full_count field
  const total:number = result.rows[0].full_count || 0;
  const data:ViewedUser[] = result.rows.map((record) => {
    const rawViewUser = _.omit(record, 'full_count');
    return {
      id: rawViewUser.id,
      userId: rawViewUser['user_id'],
      viewedUserId: rawViewUser['viewed_user_id'],
      isLike: rawViewUser['is_like'],
    };
  });

  return {
    data,
    total,
    page,
    limit,
  };
};

export default getViewedUsers;
