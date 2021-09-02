import { v4 as uuidv4 } from 'uuid';
import IUsersRepository from '../IUsersRepository';
import User from '../../infra/typeorm/entities/User';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
	private users: Array<User> = [];

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = new User();
		user.id = uuidv4();
		user.name = name;
		user.email = email;
		user.password = password;
		this.users.push(user);
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.users.find(user => {
			return user.id === id;
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(user => {
			return user.email === email;
		});
		return user;
	}

	public async update(newUserData: User): Promise<User> {
		const userIndexInArray = this.users.findIndex(user => {
			return user.id === newUserData.id;
		});

		this.users[userIndexInArray] = newUserData;

		return newUserData;
	}

	public async findAllProviders(exceptUserId?: string): Promise<User[]> {
		// desestruturando esse obejeto e pegando o array
		let { users } = this;

		if (exceptUserId) {
			users = this.users.filter(user => {
				return user.id !== exceptUserId;
			});
		}
		return users;
	}
}

export default FakeUsersRepository;
