import type { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import nc from 'next-connect';
import { MongoHelper } from '@/infra/db';
import withSession, {
  NextApiRequestWithSession,
} from '@/infra/session/iron-session';

const handler = nc();

handler.get(
  withSession(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    const user = req.session.get('user');

    if (!user) {
      res.json({
        isLoggedIn: false,
      });
    }

    try {
      const userCollection = await MongoHelper.getCollection('users');
      const [getUser] = await userCollection
        .find({ _id: new ObjectId(user._id) })
        .project({ username: 1 })
        .toArray();

      if (!getUser) {
        throw Error('User not found');
      }

      res.json({
        isLoggedIn: true,
        ...getUser,
      });
    } catch (error) {
      res.json({
        isLoggedIn: false,
        message: error.message,
      });
    }
  })
);

export default handler;
