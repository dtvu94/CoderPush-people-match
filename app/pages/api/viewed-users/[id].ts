import type { NextApiRequest, NextApiResponse } from 'next';

import getViewedUserById from '../../../services/getViewedUserById';
import deleteViewedUserById from '../../../services/deleteViewedUserById';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const idRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!id || typeof id !== 'string' || !idRegex.test(id)) {
    res.status(400).end();
    return;
  }

  if (req.method === 'GET') {
    const viewedUser = await getViewedUserById(id);

    if (viewedUser === undefined) {
      res.status(400).end();
    } else {
      res.status(200).json(viewedUser);
    }

    return;
  } else if (req.method === 'PUT') {
    // IS NOT IMPLEMENTED YET
  } else if (req.method === 'DELETE') {
    const isSuccessful = await deleteViewedUserById(id);

    if (isSuccessful) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};