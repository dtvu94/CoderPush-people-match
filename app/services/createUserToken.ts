import { v4 } from 'uuid';

import pool from '../helpers/getPgPool';
import UserToken from '../definitions/UserToken';

const createUserToken = async (input: UserToken): Promise<UserToken> => {
  const query = `INSERT INTO UserToken (id, user_id, token, expired_at)
  VALUES ('${ input.id || v4() }', '${ input.userId }', '${ input.token }', to_timestamp(${input.expiredAt.getTime() / 1000})) RETURNING *;`;

  console.debug('createUserToken query: ', query);

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    throw new Error(`Cannot create a UserToken ${ JSON.stringify(input) }`);
  }

  const userToken = result.rows[0];

  return {
    id: userToken.id,
    userId: userToken['user_id'],
    token: userToken.token,
    expiredAt: userToken['expired_at'],
  }
};

export default createUserToken;
