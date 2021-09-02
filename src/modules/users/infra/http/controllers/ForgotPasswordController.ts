import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import UserTokensRepository from '../../typeorm/repositories/UserTokenRepository';
import SESMailProvider from '../../../../../shared/providers/MailProvider/implementation/SESMailProvider';
import EtherialMailProvider from '../../../../../shared/providers/MailProvider/implementation/EtherialMailProvider';
import mailConfig from '../../../../../config/mail';

class ForgotPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email } = req.body;
		const usersRepository = new UsersRepository();

		const userTokens = new UserTokensRepository();

		const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
			usersRepository,
			mailConfig.driver === 'ethereal' ? EtherialMailProvider : SESMailProvider,
			userTokens,
		);

		await sendForgotPasswordEmailService.execute({ email });

		return res.status(204).json();
	}
}

export default ForgotPasswordController;
