import { UpdateProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export interface UpdateProjectRepository {
  updateProject: (
    id: ObjectId,
    data: UpdateProject.Params
  ) => Promise<UpdateProject.Payload>;
  exist: (id: ObjectId) => Promise<boolean>;
}
