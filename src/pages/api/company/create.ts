import { makeCreateCompanyFactory } from '@/data/factories/company';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const user = req.session.get('user');

    if (!user) {
      res.status(403).send({ message: 'Invalid to access this method' });
      return;
    }

    const createCompanyUseCase = await makeCreateCompanyFactory();
    const isCreated = await createCompanyUseCase.createCompany(req.body);

    if (!isCreated) {
      res.status(400).send({ message: 'Failed to create a company' });
    }

    res.status(201).send({ message: 'Succesfully company created' });
  }
);
