// uso para me cominicar com a camada de infra
import path from 'path';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../../../shared/providers/MailProvider/model/IMailProvider';
import AppError from '../../../shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

// tipando os dados da requisicao
interface Request {
	email: string;
}

class SendForgotPasswordEmailService {
	private usersRepository: IUsersRepository;

	private userTokensRepository: IUserTokensRepository;

	private mailProvider: IMailProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(
		usersRepository: IUsersRepository,
		mailProvider: IMailProvider,
		userTokensRepository: IUserTokensRepository,
	) {
		this.usersRepository = usersRepository;
		this.mailProvider = mailProvider;
		this.userTokensRepository = userTokensRepository;
	}

	public async execute({ email }: Request): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('user does not exists');
		}
		const { token } = await this.userTokensRepository.generate(user.id);
		const forgotPasswordTemplatePath = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		await this.mailProvider.sendMail({
			from: {
				name: 'Lucas do Gostack',
				email: 'sorteiovalidado@gmail.com',
			},
			to: {
				name: user.name,
				email: user.email,
			},
			subject: 'Recuperacao de senha GoBarber',
			templateData: {
				file: forgotPasswordTemplatePath,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
				},
			},
		});
	}
}

export default SendForgotPasswordEmailService;
