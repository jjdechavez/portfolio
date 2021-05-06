import { CreateProjectUseCase } from '@/data/usecases/project';
import { CreateProject } from '@/domain/usecases/project';
import { CompanyRepository, MongoHelper, ProjectRepository } from '@/infra/db';

export const makeCreateProjectFactory = async (): Promise<CreateProject> => {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectRepository = new ProjectRepository(projectCollection);

  const companyCollection = await MongoHelper.getCollection('companies');
  const companyRepository = new CompanyRepository(companyCollection);

  return new CreateProjectUseCase(projectRepository, companyRepository);
};
