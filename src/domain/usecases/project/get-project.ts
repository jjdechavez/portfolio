import { ObjectId } from 'mongodb';
import { Project } from '@/domain/models';

export interface GetProject {
  getProject: (id: ObjectId) => Promise<GetProject.Payload>;
}

export namespace GetProject {
  export type Payload = Project | null;
}
