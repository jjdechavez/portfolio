import { makeCreateProjectFactory } from '@/data/factories/project';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { ObjectID } from 'bson';
import { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { method, session, body } = req;

    switch (method) {
      case 'GET':
        break;
      case 'POST':
        const user = session.get('user');

        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }

        const document = {
          ...body,
          company: new ObjectID(body.company),
          assignDate: {
            ...body.assignDate,
            start: new Date(body.assignDate.start),
            end:
              typeof body.assignDate.end === 'string'
                ? body.assignDate.end
                : new Date(body.assignDate.end),
          },
        };

        const createProjectUseCase = await makeCreateProjectFactory();
        const hasCreatedProject = await createProjectUseCase.createProject(
          document
        );

        res
          .status(hasCreatedProject ? 201 : 400)
          .json({ created: hasCreatedProject });
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
);
