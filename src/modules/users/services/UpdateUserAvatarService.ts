import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../../../shared/providers/StorageProvider/model/IStorageProvider';

interface Request {
	user_id: string;
	avatar_file_name: string;
}

class UpdateUserAvatarService {
	private usersRepository: IUsersRepository;

	private storageProvider: IStorageProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(
		usersRepository: IUsersRepository,
		storageProvider: IStorageProvider,
	) {
		this.usersRepository = usersRepository;
		this.storageProvider = storageProvider;
	}

	public async execute({ user_id, avatar_file_name }: Request): Promise<User> {
		// cria uma instancia do model
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('only authenticate users can change avatar', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		const fileName = await this.storageProvider.saveFile(avatar_file_name);

		user.avatar = fileName;

		// metodo save atualiza se existir uma instancia da entidade ou cria uma instancia da entidade no banco e salva
		await this.usersRepository.update(user);

		return user;
	}
}

export default UpdateUserAvatarService;
