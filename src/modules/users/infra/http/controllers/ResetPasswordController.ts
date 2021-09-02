import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import ResetUserPasswordService from '../../../services/ResetUserPasswordService';
import UserTokensRepository from '../../typeorm/repositories/UserTokenRepository';
import HashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';

class ResetPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { token, newPassword } = req.body;
		const usersRepository = new UsersRepository();
		const hashProvider = new HashProvider();
		const userTokens = new UserTokensRepository();

		const resetUserPassword = new ResetUserPasswordService(
			usersRepository,
			userTokens,
			hashProvider,
		);

		await resetUserPassword.execute({ newPassword, token });

		return res.status(204).json();
	}
}

export default ResetPasswordController;
