import _ from 'underscore';

import UserPreview from '../definitions/UserPreview';
import ListResponse from '../definitions/ListResponse';
import pool from '../helpers/getPgPool';

const getUsers = async (page: number, limit: number): Promise<ListResponse<UserPreview>> => {
  const query = 'SELECT id, title, first_name, last_name, picture, COUNT(*) OVER() AS full_count' +
    ' FROM Users' +
    ' ORDER BY id ASC' +
    ` LIMIT ${ limit } OFFSET ${page * limit}`;

  console.debug('getUsers query: ', query);
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    // query again to get the full count
    const queryCount = 'SELECT COUNT(id) FROM Users';
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
  const data:UserPreview[] = result.rows.map((record) => {
    const rawUser = _.omit(record, 'full_count');

    return {
      id: rawUser.id,
      title: rawUser.title,
      firstName: rawUser['first_name'],
      lastName: rawUser['last_name'],
      picture: rawUser.picture
    };
  });

  return {
    data,
    total,
    page,
    limit,
  };
};

export default getUsers;
