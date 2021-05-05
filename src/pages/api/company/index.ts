import { makeFetchCompaniesFactory } from '@/data/factories/company';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;
  const fetchCompaniesUseCase = await makeFetchCompaniesFactory();
  const companies = await fetchCompaniesUseCase.fetchCompanies({ limit: 15 });

  res.send({ companies });
};
