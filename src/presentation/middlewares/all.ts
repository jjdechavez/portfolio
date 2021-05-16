import nc from 'next-connect';
import withSession from '@/infra/session/iron-session';

const all = nc();

all.use(withSession);

export default all;
