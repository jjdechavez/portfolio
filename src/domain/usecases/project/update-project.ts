import { Project } from '@/domain/models';
import { ObjectId } from 'bson';

export interface UpdateProject {
  updateProject: (
    id: ObjectId,
    data: UpdateProject.Params
  ) => Promise<UpdateProject.Payload>;
}

export namespace UpdateProject {
  export type Params = Project;
  export type Payload = boolean;
}
