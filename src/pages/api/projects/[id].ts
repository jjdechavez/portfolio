import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const {
      query: { id },
      method,
    } = req;

    switch (method) {
      case 'GET':
        break;
      case 'PUT':
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
