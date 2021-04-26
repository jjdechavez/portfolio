import { LoginUseCase } from '@/data/usecases/auth/login';
import { Login } from '@/domain/usecases/common/auth';
import { UserRepository, connectToDatabase } from '@/infra/db';
// import {connectToDatabase} from "@/util/mongodb"

export const makeLoginFactory = async (): Promise<Login> => {
  const { db } = await connectToDatabase();
  let userCollection = db.collection('users');
  const userRepository = new UserRepository(userCollection);

  return new LoginUseCase(userRepository);
};
