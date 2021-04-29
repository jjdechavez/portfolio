import { LoginUseCase } from '@/data/usecases/auth/login';
import { Login } from '@/domain/usecases/common/auth';
import { UserRepository, MongoHelper } from '@/infra/db';

export const makeLoginFactory = async (): Promise<Login> => {
  await MongoHelper.connect();
  const usersCollection = await MongoHelper.getCollection('users');
  const userRepository = new UserRepository(usersCollection);

  return new LoginUseCase(userRepository);
};
