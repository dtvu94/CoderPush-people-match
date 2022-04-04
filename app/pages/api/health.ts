import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    res.status(200).end();
    return;
  }
  
  res.status(400).end();
  return;
};
