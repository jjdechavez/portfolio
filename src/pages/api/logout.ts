import type { NextApiResponse } from 'next';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
);
