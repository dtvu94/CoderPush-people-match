import _ from 'underscore';

import Location from "../definitions/Location";
import pool from '../helpers/getPgPool';

const getLocation = async (input: Partial<Location>): Promise<Location | undefined> => {
  let query = 'SELECT * FROM Locations WHERE ';

  let addAND = false;
  if (input.id) {
    query += `id='${ input.id }'`;
    addAND = true;
  }

  if (input.street) {
    if (addAND) {
      query += ' AND ';
    }

    query += `street='${input.street}'`;
    addAND = true;
  }

  if (input.city) {
    if (addAND) {
      query += ' AND ';
    }

    query += `city='${input.city}'`;
    addAND = true;
  }

  if (input.state) {
    if (addAND) {
      query += ' AND ';
    }

    query += `state='${input.state}'`;
    addAND = true;
  }

  if (input.country) {
    if (addAND) {
      query += ' AND ';
    }

    query += `country='${input.country}'`;
    addAND = true;
  }

  if (input.timezone) {
    if (addAND) {
      query += ' AND ';
    }

    query += `timezone='${input.timezone}'`;
  }

  console.debug('getLocation query: ', query);
  const result = await pool.query(query);
  
  if (result.rows.length === 0) {
    return;
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

export default getLocation;
