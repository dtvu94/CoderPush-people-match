import type { NextApiRequest, NextApiResponse } from 'next';

import getViewedUsers from '../../../services/getViewedUsers';
import createViewedUser from '../../../services/createViewedUser';
import parsePageAndLimitFromRequest from '../../../helpers/parsePageAndLimitFromRequest';
import getViewedUser from '../../../services/getViewedUser';
import updateViewedUser from '../../../services/updateViewedUser';
import getUsersByIds from '../../../services/getUsersByIds';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { page, limit } = parsePageAndLimitFromRequest(req.query.page, req.query.limit);
    const { userid, vieweduserid, isFullInfo } = req.query;

    if (Array.isArray(userid) || Array.isArray(vieweduserid) || Array.isArray(isFullInfo)) {
      res.status(400).end();
      return;
    }

    const response = await getViewedUsers(page, limit, userid, vieweduserid);

    if (isFullInfo === 'yes' && response.data.length > 0) {
      // retrieve complete user info
      const viewedUsers = response.data.map((x) => {
        return {
          id: x.viewedUserId,
          isLiked: x.isLike,
        }
      });

      const users = await getUsersByIds(viewedUsers.map(x => x.id));

      res.status(200).json({
        data: viewedUsers.map((x) => {
          console.log('x: ', x);
          const retrievedUser = users.find((u) => u.id === x.id);

          if (!retrievedUser) {
            throw new Error(`there is an user id which is not existed ${ x.id }`)
          }

          return {
            ...retrievedUser,
            isLiked: x.isLiked,
          };
        }),
        total: response.total,
        page: response.page,
        limit: response.limit,
      });
    } else {
      res.status(200).json(response);
    }

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
