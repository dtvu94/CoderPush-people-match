import User from '../definitions/User';
import pool from '../helpers/getPgPool';
import getLocation from './getLocation';
import createLocation from './createLocation';

const createUser = async (input: User): Promise<User> => {
  const retrievedLocation = await getLocation(input.location);
  const location = retrievedLocation !== undefined ? retrievedLocation : await createLocation(input.location);

  const query = `INSERT INTO Users (id, title, last_name, first_name, gender, email, dob, register_date, phone, picture, location_id)
VALUES ('${ input.id }', '${ input.title }', '${ input.lastName }', '${ input.firstName }', '${input.gender}', '${ input.email }', ${ input.dateOfBirth ? `to_timestamp(${input.dateOfBirth.getTime() / 1000})` : 'NULL'}, to_timestamp(${input.registerDate.getTime() / 1000}), '${ input.phone }', '${ input.picture }', '${ location.id }') RETURNING *;`;

  console.debug('createUser query: ', query);

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    throw new Error(`Cannot create a user ${ input }`);
  }

  const user = result.rows[0];

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

export default createUser;
