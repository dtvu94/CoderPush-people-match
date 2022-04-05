import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { v4 } from 'uuid';

import getUsers from '../../../services/getUsers';
import createUser from '../../../services/createUser';
import parsePageAndLimitFromRequest from '../../../helpers/parsePageAndLimitFromRequest';
import parseUserFromRequest from '../../../helpers/parseUserFromRequest';
import createUserToken from '../../../services/createUserToken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { page, limit } = parsePageAndLimitFromRequest(req.query.page, req.query.limit);

    const response = await getUsers(page, limit, req.query.notview, req.query.id);

    res.status(200).json(response);

    return;
  } else if (req.method === 'POST') {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      res.status(400).end();
      return;
    }

    const date = new Date();
    const user = parseUserFromRequest(req.body);
    const userToken = {
      id: v4(),
      userId: user.id,
      token: req.body.token || crypto.randomBytes(48).toString('hex'),
      expiredAt: new Date(date.setMonth(date.getMonth() + 2)),
    };

    try {
      const createdUser = await createUser(user);
      const createdUserToken = await createUserToken(userToken);

      res.status(200).json({
        ...createdUser,
        ...createdUserToken,
        id: createdUser.id,
      });
    } catch(error) {
      console.error(error);
      res.status(400).end();
    }
    
    return;
  }

  res.status(400).end();
};
