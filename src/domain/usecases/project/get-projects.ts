import { Project } from '@/domain/models';

export interface GetProjects {
  projects: () => Promise<GetProjects.Payload>;
}

export namespace GetProjects {
  export type Payload = Project[];
}
