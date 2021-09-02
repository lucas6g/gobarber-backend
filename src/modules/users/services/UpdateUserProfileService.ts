import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

// usar um service para todas as funcionalidades
// uso para me cominicar com a camada de infra
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
// tipando os dados da requisicao
interface Request {
	user_id: string;
	name: string;
	email: string;
	newPassword?: string;
	old_password?: string;
}

class UpdateUserProfileService {
	private usersRepository: IUsersRepository;

	// o serviço de hash de uma senha
	private hashProvider: IHashProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
		this.usersRepository = usersRepository;
		this.hashProvider = hashProvider;
	}

	public async execute({
		name,
		email,
		newPassword,
		user_id,
		old_password,
	}: Request): Promise<User> {
		// usando um repositori quando não a necessidade de usar um criado por mim

		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found.');
		}

		const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
			throw new AppError('E-mail already in use.');
		}

		user.name = name;
		user.email = email;

		if (newPassword && !old_password) {
			throw new AppError(
				'You need to inform the old password to set a new password.',
			);
		}

		if (newPassword && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(
				old_password,
				user.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match.');
			}

			user.password = await this.hashProvider.generateHash(newPassword);
		}
		await this.usersRepository.update(user);

		return user;
	}
}

export default UpdateUserProfileService;
