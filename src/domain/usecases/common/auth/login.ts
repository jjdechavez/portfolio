import { NextApiRequest } from 'next';
import { Session } from 'next-iron-session';

export interface NextApiRequestWithSession extends NextApiRequest {
  session: Session;
}

export interface Login {
  login: (data: Login.Params) => Promise<Login.Payload>;
}

export namespace Login {
  export type Params = {
    user: {
      username: string;
      password: string;
    };
    req: NextApiRequestWithSession;
  };
  export type Payload = {
    login: boolean;
    message?: string;
  };
}
