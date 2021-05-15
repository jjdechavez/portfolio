import { NextApiResponse } from 'next';
import nc from 'next-connect';
import {
  makeCreateProjectFactory,
  makeGetProjectsFactory,
} from '@/data/factories/project';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { projectDocumentParse } from '@/presentation/helpers';

const handler = nc();

handler.get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const getProductsUseCase = await makeGetProjectsFactory();
  const projects = await getProductsUseCase.projects();

  res.json({ projects });
});

handler.post(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { session, body } = req;

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
  })
);

export default handler;
