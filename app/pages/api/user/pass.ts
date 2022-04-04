import type { NextApiRequest, NextApiResponse } from 'next';

import createViewedUser from '../../../services/createViewedUser';
import getViewedUser from '../../../services/getViewedUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const idRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const { userId, viewedUserId } = req.query;
    if (!userId || !viewedUserId || typeof userId !== 'string' || typeof viewedUserId !== 'string' || !idRegex.test(userId) || !idRegex.test(viewedUserId)) {
      res.status(400).end();
      return;
    }

    const viewedUser = await getViewedUser(userId, viewedUserId, false);

    if (viewedUser === undefined) {
      res.status(400).end();
    } else {
      res.status(200).json(viewedUser);
    }

    return;
  } else if (req.method === 'PUT') {
    if (!req.body.userId || !req.body.viewedUserId) {
      res.status(400).end();
      return;
    }

    try {
      const createdViewedUser = await createViewedUser(req.body.userId, req.body.viewedUserId, true);
      res.status(200).json(createdViewedUser);
    } catch (error) {
      console.error(error);
      res.status(400).end();
    };

    return;
  }
  
  res.status(400).end();
  return;
};
