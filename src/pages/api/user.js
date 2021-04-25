import { ObjectId } from 'mongodb';
import withSession from '@/lib/session';
import { connectToDatabase } from '@/util/mongodb';

export default withSession(async (req, res) => {
  const user = req.session.get('user');

  if (!user) {
    res.json({
      isLoggedIn: false,
    });
  }

  try {
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    const [getUser] = await userCollection
      .find({ _id: ObjectId(user._id) })
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
});
