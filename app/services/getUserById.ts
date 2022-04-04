import User from '../definitions/User';
import pool from '../helpers/getPgPool';
import getLocation from './getLocation';

const getUserById = async (id: string): Promise<User | undefined> => {
  const query = `SELECT * FROM Users WHERE id='${id}'`;

  console.debug('getUserById query: ', query);
  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return;
  }

  const user = result.rows[0];
  const location = await getLocation({ id: user['location_id'] });

  if (!location) {
    return;
  }

  return {
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
  };
};

export default getUserById;
