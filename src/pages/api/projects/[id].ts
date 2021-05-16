import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import {
  makeDeleteProjectFactory,
  makeGetProjectFactory,
  makeUpdateProjectFactory,
} from '@/data/factories/project';
import { MongoHelper } from '@/infra/db';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';
import { projectDocumentParse } from '@/presentation/helpers';
import { uploadMiddleware } from '@/infra/file-upload';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).send({ message: 'Provide id' });
    return;
  }

  const projectCollection = await MongoHelper.getCollection('projects');
  const idParsed = MongoHelper.parseId(id as string);

  const getProjectUseCase = makeGetProjectFactory(projectCollection);
  const project = await getProjectUseCase.getProject(idParsed);

  res.json({ project });
});

handler.use(uploadMiddleware);

handler.put(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const {
      session,
      body,
      query: { id },
    } = req;

    console.log(req);

    if (!id) {
      res.status(400).send({ message: 'Provide id' });
      return;
    }
    if (!body) {
      res.status(400).send({ message: 'Provide data to update' });
      return;
    }

    const user = session.get('user');
    if (!user) {
      res.status(403).send({ message: 'Invalid to access this method' });
      return;
    }

    const companyCollection = await MongoHelper.getCollection('companies');
    const projectCollection = await MongoHelper.getCollection('projects');

    const updateProjectUseCase = makeUpdateProjectFactory(
      projectCollection,
      companyCollection
    );

    const projectDocumentParsed = projectDocumentParse(body);
    const idParsed = MongoHelper.parseId(id as string);

    const hasUpdated = await updateProjectUseCase.updateProject(
      idParsed,
      projectDocumentParsed
    );

    res.json({ updated: hasUpdated });
  })
);

handler.delete(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const {
      session,
      query: { id },
    } = req;

    const user = session.get('user');
    if (!user) {
      res.status(403).send({ message: 'Invalid to access this method' });
      return;
    }
    if (!id) {
      res.status(400).send({ message: 'Provide id' });
      return;
    }

    const idParsed = MongoHelper.parseId(id as string);

    const projectCollection = await MongoHelper.getCollection('projects');

    const deleteProjectUseCase = makeDeleteProjectFactory(projectCollection);
    const hasDeleted = await deleteProjectUseCase.deleteProject(idParsed);
    res.json({ deleted: hasDeleted });
  })
);

export default handler;

// export const config = {
//   api: {
//     bodyParser: , // Disallow body parsing, consume as stream
//   },
// };
