// uso para me cominicar com a camada de infra
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// tipando os dados da requisicao
interface Request {
	newPassword: string;
	token: string;
}

class ResetUserPasswordService {
	private usersRepository: IUsersRepository;

	private userTokensRepository: IUserTokensRepository;

	private hashProvider: IHashProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(
		usersRepository: IUsersRepository,
		userTokensRepository: IUserTokensRepository,
		hashProvider: IHashProvider,
	) {
		this.usersRepository = usersRepository;
		this.userTokensRepository = userTokensRepository;
		this.hashProvider = hashProvider;
	}

	public async execute({ newPassword, token }: Request): Promise<void> {
		const userToken = await this.userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('token dont math', 400);
		}
		const user = await this.usersRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError('user does not exists', 404);
		}

		const tokenCreatedAt = userToken.created_at;
		const compareDate = addHours(tokenCreatedAt, 2);

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('token is expires');
		}

		user.password = await this.hashProvider.generateHash(newPassword);

		await this.usersRepository.update(user);
	}
}

export default ResetUserPasswordService;
