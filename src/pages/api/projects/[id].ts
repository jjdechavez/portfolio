import {
  makeDeleteProjectFactory,
  makeGetProjectFactory,
  makeUpdateProjectFactory,
} from '@/data/factories/project';
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
      body,
      method,
      session,
    } = req;

    const user = session.get('user');
    const projectCollection = await MongoHelper.getCollection('projects');

    const idParsed = new ObjectId(id as string);

    switch (method) {
      case 'GET':
        const getProjectUseCase = makeGetProjectFactory(projectCollection);
        const project = await getProjectUseCase.getProject(idParsed);

        res.json({ project });
        break;
      case 'PUT':
        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }
        const companyCollection = await MongoHelper.getCollection('companies');
        const updateProjectUseCase = makeUpdateProjectFactory(
          projectCollection,
          companyCollection
        );

        const document = {
          ...body,
          company: new ObjectId(body.company),
          assignDate: {
            ...body.assignDate,
            start: new Date(body.assignDate.start),
            end:
              typeof body.assignDate.end === 'string'
                ? body.assignDate.end
                : new Date(body.assignDate.end),
          },
        };

        const hasUpdated = await updateProjectUseCase.updateProject(
          idParsed,
          document
        );

        res.json({ updated: hasUpdated });
        break;
      case 'DELETE':
        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }

        const deleteProjectUseCase = makeDeleteProjectFactory(
          projectCollection
        );
        const hasDeleted = await deleteProjectUseCase.deleteProject(idParsed);
        res.json({ deleted: hasDeleted });
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
