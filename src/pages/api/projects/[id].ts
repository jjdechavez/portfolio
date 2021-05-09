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
      session,
    } = req;

    const user = session.get('user');
    const projectCollection = await MongoHelper.getCollection('projects');

    switch (method) {
      case 'GET':
        const idParsed = new ObjectId(id as string);
        const getProjectUseCase = makeGetProjectFactory(projectCollection);
        const project = await getProjectUseCase.getProject(idParsed);

        res.json({ project });
        break;
      case 'PUT':
        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }
        break;
      case 'DELETE':
        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
