import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import { makeLoginFactory } from '@/data/factories/auth';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

const handler = nc();

handler.post(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { username, password } = req.body;

    const loginUseCase = await makeLoginFactory();
    let data = {
      user: { username, password },
      req,
    };

    const isAuth = await loginUseCase.login(data);

    if (!isAuth.login) {
      res.status(500).send(isAuth);
      return;
    }

    res.send(isAuth);
  })
);

export default handler;
