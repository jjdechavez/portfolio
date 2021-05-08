import { GetProject } from '@/domain/usecases/project';
import { ObjectId } from 'mongodb';

export interface GetProjectRepository {
  findById: (id: ObjectId) => Promise<GetProject.Payload>;
}
