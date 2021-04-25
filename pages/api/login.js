import { connectToDatabase } from 'util/mongodb';
import withSession from 'lib/session';

export default withSession(async (req, res) => {
  const { username, password } = req.body;

  try {
    const { db } = await connectToDatabase();

    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ username });

    if (!user) {
      throw Error('Invalid username or password');
    }

    if (user.password !== password) {
      throw Error('Invalid username or password');
    }

    req.session.set('user', {
      _id: user._id,
      username: user.username,
    });
    await req.session.save();

    res.json({ login: true });
  } catch (error) {
    res.status(500).json({ login: false, message: error.message });
  }
});
