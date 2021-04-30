import { LoginUseCase } from '@/data/usecases/auth/login';
import { Login } from '@/domain/usecases/common/auth';
import { AuthHelper } from '@/infra/auth';
import { UserRepository, MongoHelper } from '@/infra/db';

export const makeLoginFactory = async (): Promise<Login> => {
  await MongoHelper.connect();
  const usersCollection = await MongoHelper.getCollection('users');
  const userRepository = new UserRepository(usersCollection);
  const authHelper = new AuthHelper();

  return new LoginUseCase(userRepository, authHelper);
};
