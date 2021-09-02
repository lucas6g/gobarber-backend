import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

// define a regra para todos os repositorios de usuario

interface IUsersRepository {
	create(user: ICreateUserDTO): Promise<User>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	update(user: User): Promise<User>;
	findAllProviders(exeptUserId?: string): Promise<User[]>;
}

export default IUsersRepository;
