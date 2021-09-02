import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class SessionController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const usersRepository = new UsersRepository();
		const bcryptHashProvider = new BCryptHashProvider();
		const authenticateUserService = new AuthenticateUserService(
			usersRepository,
			bcryptHashProvider,
		);

		const { user, token } = await authenticateUserService.execute({
			email,
			password,
		});

		return res.json({ user: classToClass(user), token });
	}
}

export default SessionController;
