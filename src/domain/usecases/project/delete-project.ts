import { ObjectId } from 'bson';

export interface DeleteProject {
  deleteProject: (id: ObjectId) => Promise<DeleteProject.Payload>;
}

export namespace DeleteProject {
  export type Payload = boolean;
}
