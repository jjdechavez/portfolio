import { Project } from '@/domain/models';
import { ObjectID } from 'mongodb';

export interface CreateProject {
  createProject: (
    project: CreateProject.Params
  ) => Promise<CreateProject.Payload>;
}

export namespace CreateProject {
  export type Params = Omit<Project, '_id'>;
  type CreateError = {
    created: boolean;
    message: string;
  };
  export type Payload = Boolean | CreateError;
}
