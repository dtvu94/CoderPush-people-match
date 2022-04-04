import pool from '../helpers/getPgPool';

const deleteViewedUserById = async (id: string): Promise<boolean> => {
  const query = `DELETE FROM ViewedUsers WHERE id='${id}'`;

  console.debug('deleteViewedUserById query: ', query);
  const result = await pool.query(query);

  if (result.rowCount === 1) {
    return true;
  }

  return false;
};

export default deleteViewedUserById;
