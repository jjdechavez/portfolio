import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  makeFetchCompaniesFactory,
  makeCreateCompanyFactory,
} from '@/data/factories/company';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;

  let query = {
    limit: limit ? +limit : 10,
  };

  const fetchCompaniesUseCase = await makeFetchCompaniesFactory();
  const companies = await fetchCompaniesUseCase.fetchCompanies(query);

  res.send({ companies });
});

handler.post(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
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
  })
);

export default handler;
