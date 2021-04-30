import { NextApiRequest } from 'next';
import { Session, Handler, withIronSession } from 'next-iron-session';

export interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}

export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'auth',
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
