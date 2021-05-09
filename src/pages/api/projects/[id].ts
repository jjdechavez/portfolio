import { makeGetProjectFactory } from '@/data/factories/project';
import { MongoHelper } from '@/infra/db';
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

    const projectCollection = await MongoHelper.getCollection('projects');

    switch (method) {
      case 'GET':
        const idParsed = new ObjectId(id as string);
        const getProjectUseCase = makeGetProjectFactory(projectCollection);
        const project = await getProjectUseCase.getProject(idParsed);

        res.json({ project });
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
