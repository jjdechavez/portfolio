import type { NextApiResponse } from 'next';
import { makeLoginFactory } from '@/data/factories/auth';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { username, password } = req.body;

    const loginUseCase = await makeLoginFactory();
    let data = {
      user: { username, password },
      req,
    };

    const isAuth = await loginUseCase.login(data);

    if (!isAuth.login) {
      res.status(500).send(isAuth);
    }

    res.send(isAuth);
  }
);
