import { v4 } from 'uuid';

import Location from "../definitions/Location";
import pool from '../helpers/getPgPool';

const createLocation = async (input: Location): Promise<Location> => {
  const query = `INSERT INTO Locations (id, street, city, lstate, country, timezone)
  VALUES ('${ input.id || v4() }', '${ input.street }', '${ input.city }', '${ input.state }', '${ input.country }', '${ input.timezone }') RETURNING *;`;

  console.debug('createLocation query: ', query);

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    throw new Error(`Cannot create a location ${ input }`);
  }

  const location = result.rows[0];

  return {
    id: location.id,
    street: location.street,
    city: location.city,
    state: location.lstate,
    country: location.country,
    timezone: location.timezone,
  };
};

export default createLocation;
