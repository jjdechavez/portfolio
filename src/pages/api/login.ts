import type { NextApiResponse } from 'next';
import { makeLoginFactory } from '@/data/factories/auth';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { username, password } = req.body;

    try {
      const loginUseCase = await makeLoginFactory();
      let data = {
        user: { username, password },
        req,
      };

      const result = await loginUseCase.login(data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ login: false, message: error.message });
    }
  }
);
