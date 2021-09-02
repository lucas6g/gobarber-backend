import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

// uso para me cominicar com a camada de infra
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';

// tipando os dados da requisicao
interface Request {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	private usersRepository: IUsersRepository;

	private cacheProvider: ICacheProvider;

	// o serviço de hash de uma senha
	private hashProvider: IHashProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(
		usersRepository: IUsersRepository,
		hashProvider: IHashProvider,
		cacheProvider: ICacheProvider,
	) {
		this.usersRepository = usersRepository;
		this.hashProvider = hashProvider;
		this.cacheProvider = cacheProvider;
	}

	public async execute({ name, email, password }: Request): Promise<User> {
		// usando um repositori quando não a necessidade de usar um criado por mim

		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('email already exists');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		// invalidando varios cache
		await this.cacheProvider.invalidateWhitPrefix('providers-list');

		return user;
	}
}

export default CreateUserService;
