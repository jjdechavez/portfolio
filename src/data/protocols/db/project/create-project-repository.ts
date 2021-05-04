import { Project } from '@/domain/models';

export interface CreateProjectRepository {
  create: (
    project: CreateProjectRepository.Params
  ) => Promise<CreateProjectRepository.Payload>;
}

export namespace CreateProjectRepository {
  export type Params = Project;
  export type Payload = Project;
}
