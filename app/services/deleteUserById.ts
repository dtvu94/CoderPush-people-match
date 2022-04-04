import pool from '../helpers/getPgPool';

const deleteUserById = async (id: string): Promise<boolean> => {
  const query = `DELETE FROM Users WHERE id='${id}'`;

  console.debug('deleteUserById query: ', query);
  const result = await pool.query(query);

  if (result.rowCount === 1) {
    return true;
  }

  return false;
};

export default deleteUserById;
