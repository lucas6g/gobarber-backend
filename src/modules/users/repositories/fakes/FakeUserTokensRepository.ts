import { v4 as uuidv4 } from 'uuid';
import IUserTokensRepository from '../IUserTokensRepository';
import UserTokens from '../../infra/typeorm/entities/UserTokens';

class FakeUserTokensRepository implements IUserTokensRepository {
	private userTokens: Array<UserTokens> = [];

	public async generate(user_id: string): Promise<UserTokens> {
		const userToken = new UserTokens();
		userToken.id = uuidv4();
		userToken.token = uuidv4();
		userToken.user_id = user_id;
		userToken.created_at = new Date();
		userToken.updated_at = new Date();

		this.userTokens.push(userToken);
		return userToken;
	}

	public async findByToken(token: string): Promise<UserTokens | undefined> {
		const userToken = this.userTokens.find(userToken => {
			return userToken.token === token;
		});

		return userToken;
	}
}

export default FakeUserTokensRepository;
