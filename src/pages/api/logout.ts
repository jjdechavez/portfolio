import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

const handler = nc();

handler.post(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  })
);

export default handler;
