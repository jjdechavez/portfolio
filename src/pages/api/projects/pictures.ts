import { NextApiResponse } from 'next';
import nc from 'next-connect';
import fs from 'fs';
import { uploadMiddleware } from '@/infra/file-upload';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

const outputFolderName = './public/uploads/projects';
const handler = nc();

handler.use(uploadMiddleware);

handler.post(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const { session } = req;

    const user = session.get('user');
    if (!user) {
      res.status(403).send({ message: 'Invalid to access this method' });
      return;
    }

    const filenames = fs.readdirSync(outputFolderName);
    const images = filenames.map((name) => name);

    res.json({ images });
  })
);

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
