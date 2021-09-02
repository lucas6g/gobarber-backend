import { Repository, getRepository, Not } from 'typeorm';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	// dto serve para passar os dados da req para a camada de serviços
	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = await this.ormRepository.create({ name, email, password });
		await this.ormRepository.save(user);
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id);
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: { email },
		});
		return user;
	}

	public async update(user: User): Promise<User> {
		const updatedUser = await this.ormRepository.save(user);
		return updatedUser;
	}

	public async findAllProviders(exeptUserId: string): Promise<User[]> {
		let users: User[];

		if (exeptUserId) {
			users = await this.ormRepository.find({
				where: {
					id: Not(exeptUserId),
				},
			});
		} else {
			users = await this.ormRepository.find();
		}

		return users;
	}
}

export default UsersRepository;
