import type { NextApiRequest, NextApiResponse } from 'next';

import getViewedUsers from '../../../services/getViewedUsers';
import createViewedUser from '../../../services/createViewedUser';
import parsePageAndLimitFromRequest from '../../../helpers/parsePageAndLimitFromRequest';
import getViewedUser from '../../../services/getViewedUser';
import updateViewedUser from '../../../services/updateViewedUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { page, limit } = parsePageAndLimitFromRequest(req.query.page, req.query.limit);
    const { userid, vieweduserid } = req.query;

    if (Array.isArray(userid) || Array.isArray(vieweduserid)) {
      res.status(400).end();
      return;
    }

    const response = await getViewedUsers(page, limit, userid, vieweduserid);

    res.status(200).json(response);

    return;
  } else if (req.method === 'POST') {
    if (!req.body.userId || !req.body.viewedUserId || req.body.isLike === undefined) {
      res.status(400).end();
      return;
    }

    try {
      const existedViewedUser = await getViewedUser(req.body.userId, req.body.viewedUserId);

      if (existedViewedUser) {
        const updatedViewedUser = await updateViewedUser(existedViewedUser.id, req.body.isLike);
        res.status(200).json(updatedViewedUser);
      } else {
        const createdViewedUser = await createViewedUser(req.body.userId, req.body.viewedUserId, req.body.isLike);
        res.status(200).json(createdViewedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(400).end();
    };

    return;
  }

  res.status(400).end();
};
