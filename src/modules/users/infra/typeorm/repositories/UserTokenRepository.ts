import { v4 as uuidv4 } from 'uuid';
import { Repository, getRepository } from 'typeorm';
import IUserTokensRespository from '../../../repositories/IUserTokensRepository';
import UserTokens from '../entities/UserTokens';

class UserTokensRepository implements IUserTokensRespository {
	private ormRepository: Repository<UserTokens>;

	constructor() {
		this.ormRepository = getRepository(UserTokens);
	}

	public async generate(user_id: string): Promise<UserTokens> {
		const userToken = this.ormRepository.create({ user_id });

		await this.ormRepository.save(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserTokens | undefined> {
		const userToken = await this.ormRepository.findOne({ where: { token } });

		return userToken;
	}
}

export default UserTokensRepository;
