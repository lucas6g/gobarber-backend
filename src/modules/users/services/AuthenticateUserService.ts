import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import auth from '../../../config/auth';

interface Request {
	email: string;
	password: string;
}

// criar uma tipo response quando presizar formatar um tipo
interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	private usersRepository: IUsersRepository;

	// uso a interface para um sistema com baixo aclopamento
	private hashProvider: IHashProvider;

	constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
		this.usersRepository = usersRepository;
		this.hashProvider = hashProvider;
	}

	public async execute({ email, password }: Request): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('invalid email/password combination', 401);
		}

		const isPassword = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!isPassword) {
			throw new AppError('invalid email/password combination', 401);
		}

		// o que aramazenamos no token são informaçoes permisao do user
		const token = sign({}, auth.jwt.secretKey, {
			subject: user.id,
			expiresIn: auth.jwt.expiresIn,
		});

		return {
			user,
			token,
		};
	}
}

export default AuthenticateUserService;
