import UserTokens from '../infra/typeorm/entities/UserTokens';

interface IUserTokensRepository {
	generate(user_id: string): Promise<UserTokens>;
	findByToken(token: string): Promise<UserTokens | undefined>;
}

export default IUserTokensRepository;
