import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

// usar um service para todas as funcionalidades

// uso para me cominicar com a camada de infra
import IUsersRepository from '../repositories/IUsersRepository';

// tipando os dados da requisicao

class ShowProfileService {
	private usersRepository: IUsersRepository;

	// precissa receber uma variavel do tipo da interface
	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	public async execute(user_id: string): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('user does not exists');
		}

		return user;
	}
}

export default ShowProfileService;
