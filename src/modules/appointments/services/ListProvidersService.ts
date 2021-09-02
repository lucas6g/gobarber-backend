import User from '../../users/infra/typeorm/entities/User';
// usar um service para todas as funcionalidades
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';

// uso para me cominicar com a camada de infra
import IUsersRepository from '../../users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

// tipando os dados da requisicao

class ListProvidersService {
	private usersRepository: IUsersRepository;

	private cacheProvider: ICacheProvider;

	// precissa receber uma variavel do tipo da interface
	constructor(
		usersRepository: IUsersRepository,
		cacheProvider: ICacheProvider,
	) {
		this.usersRepository = usersRepository;
		this.cacheProvider = cacheProvider;
	}

	public async execute(exeptUserId: string): Promise<User[]> {
		// busca os providers exeto o id do provider logado no cache
		// metodo recover fica generico para retornar qualquer tipo
		let users = await this.cacheProvider.recover<User[]>(
			`providers-list:${exeptUserId}`,
		);

		// se nao tiver um cache
		if (!users) {
			users = await this.usersRepository.findAllProviders(exeptUserId);
		}

		// cache é diferente para cada user logado
		await this.cacheProvider.save(`providers-list:${exeptUserId}`,classToClass(users));
		return users;
	}
}

export default ListProvidersService;
