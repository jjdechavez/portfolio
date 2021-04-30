import { NextApiRequestWithSession } from '@/infra/session/iron-session';

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
