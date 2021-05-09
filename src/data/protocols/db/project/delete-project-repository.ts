import { DeleteProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export interface DeleteProjectRepository {
  deleteProjectById: (id: ObjectId) => Promise<DeleteProject.Payload>;
}
