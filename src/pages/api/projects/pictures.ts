import { NextApiResponse } from 'next';
import nc from 'next-connect';
import fs from 'fs';
import { NextApiRequestWithFiles, uploadMiddleware } from '@/infra/file-upload';
import withSession from '@/infra/session/iron-session';

const outputFolderName = `./public/uploads/projects`;
const handler = nc();

handler.use(uploadMiddleware);

handler.post(
  withSession(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    const { session, files } = req;

    const user = session.get('user');
    if (!user) {
      res.status(403).send({ message: 'Invalid to access this method' });
      return;
    }

    const filenames = fs.readdirSync(outputFolderName);
    const images = files.map((file) => {
      if (filenames.includes(file.filename)) {
        return {
          filename: file.filename,
          path: `${process.env.BASE_URL}/uploads/projects/${file.filename}`,
        };
      }
    });

    res.json({ images });
  })
);

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
