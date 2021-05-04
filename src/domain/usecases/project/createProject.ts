import { ObjectID } from 'mongodb';

export interface CreateProject {
  createProject: (
    project: CreateProject.Params
  ) => Promise<CreateProject.Payload>;
}

export namespace CreateProject {
  export type Params = {
    name: string;
    role: string;
    description?: string;
    publish: boolean;
    url?: string;
    assignDate?: {
      start: Date;
      end: Date;
      ongoing: boolean;
    };
    technologies?: string[];
    company: ObjectID;
  };
  type CreateError = {
    message: string;
  };
  export type Payload = Boolean | CreateError;
}
