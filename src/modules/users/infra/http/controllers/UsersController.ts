import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementation/RedisCacheProvider';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;
		const usersRepository = new UsersRepository();
		const bCryptHashProvider = new BCryptHashProvider();
		const redisCacheProvider = new RedisCacheProvider();

		const createUser = new CreateUserService(
			usersRepository,
			bCryptHashProvider,
			redisCacheProvider,
		);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return res.status(201).json(classToClass(user));
	}
}

export default UsersController;
