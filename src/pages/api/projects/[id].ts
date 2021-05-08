import { makeGetProjectFactory } from '@/data/factories/project';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const {
      query: { id },
      method,
    } = req;

    switch (method) {
      case 'GET':
        const idParsed = new ObjectId(id as string);
        const getProjectUseCase = await makeGetProjectFactory();
        const project = await getProjectUseCase.getProject(idParsed);

        res.json({ project });

        break;
      case 'PUT':
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
