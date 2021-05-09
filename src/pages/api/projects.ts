import {
  makeCreateProjectFactory,
  makeGetProjectsFactory,
} from '@/data/factories/project';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { projectDocumentParse } from '@/presentation/helpers';
import { ObjectID } from 'bson';
import { NextApiResponse } from 'next';

export default withSession(
  async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { method, session, body } = req;

    switch (method) {
      case 'GET':
        const getProductsUseCase = await makeGetProjectsFactory();
        const projects = await getProductsUseCase.projects();

        res.json({ projects });
        break;
      case 'POST':
        const user = session.get('user');

        if (!user) {
          res.status(403).send({ message: 'Invalid to access this method' });
          return;
        }

        const projectDocumentParsed = projectDocumentParse(body);

        const createProjectUseCase = await makeCreateProjectFactory();
        const hasCreatedProject = await createProjectUseCase.createProject(
          projectDocumentParsed
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
