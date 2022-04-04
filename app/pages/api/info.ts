import type { NextApiRequest, NextApiResponse } from 'next';

type INFO = {
  name: string;
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<INFO>,
) {
  if (req.method === 'GET') {
    res.status(200).json({
      name: 'Coder Push - People Match application',
      description: 'A simple version of Tinder application',
    });

    return;
  }

  res.status(400).end();
};
