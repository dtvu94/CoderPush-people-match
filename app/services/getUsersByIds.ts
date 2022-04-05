import User from '../definitions/User';
import pool from '../helpers/getPgPool';
import getLocation from './getLocation';

const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  let query = 'SELECT * FROM Users WHERE id IN (';
  for (let i = 0; i < ids.length; i++) {
    if (i + 1 === ids.length) {
      query += `'${ ids[i] }');`
    } else {
      query += `'${ ids[i] }',`;
    }
  }

  console.debug('getUsersByIds query: ', query);
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return [];
  }

  const users: User[] = [];

  for (let i = 0; i < result.rows.length; i++) {
    const user = result.rows[i];
    const location = await getLocation({ id: user['location_id'] });

    if (!location) {
      continue;
    }

    users.push({
      id: user.id,
      title: user.title,
      firstName: user['first_name'],
      lastName: user['last_name'],
      gender: user.gender,
      email: user.email,
      dateOfBirth: user.dob,
      registerDate: user['register_date'],
      phone: user.phone,
      picture: user.picture,
      location,
    });
  }

  return users;
};

export default getUsersByIds;
