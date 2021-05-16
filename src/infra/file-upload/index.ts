import multer from 'multer';
import { NextApiRequestWithSession } from '../session/iron-session';

export interface NextApiRequestWithFiles extends NextApiRequestWithSession {
  files: any[];
}

function getExtType(mimetype: string) {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    default:
      return '.jpg';
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/projects',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + getExtType(file.mimetype));
    },
  }),
});

export const uploadMiddleware = upload.array('projects');
