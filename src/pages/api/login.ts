import type { NextApiResponse } from 'next';
import withSession from '@/lib/session';
import { makeLoginFactory } from '@/data/factories/auth';
import { NextApiRequestWithSession } from '@/domain/common/auth';

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
