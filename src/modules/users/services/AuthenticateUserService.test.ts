import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCrypHashProvider';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';

describe('AuthenticateUser', () => {
	it('should authenticate a user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const bcryptHashProvider = new FakeBCryptHashProvider();
		const fakeCacheProvider = new FakeCacheProvider();
		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			bcryptHashProvider,
		);
		const createUser = new CreateUserService(
			fakeUsersRepository,
			bcryptHashProvider,
			fakeCacheProvider,
		);

		const userEmail = 'lucas@gmail.com';
		const userPassword = '102030';

		const user = await createUser.execute({
			name: 'lucas',
			email: userEmail,
			password: userPassword,
		});

		const response = await authenticateUser.execute({
			email: userEmail,
			password: userPassword,
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not authenticate a user if it does not exist', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const bcryptHashProvider = new FakeBCryptHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			bcryptHashProvider,
		);

		await expect(
			authenticateUser.execute({
				email: 'teofalo@gmail.com',
				password: '102030',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not authenticate a user if their password does not match', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const bcryptHashProvider = new FakeBCryptHashProvider();
		const fakeCacheProvider = new FakeCacheProvider();
		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			bcryptHashProvider,
		);
		const createUser = new CreateUserService(
			fakeUsersRepository,
			bcryptHashProvider,
			fakeCacheProvider,
		);

		await createUser.execute({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: '102030',
		});

		await expect(
			authenticateUser.execute({
				email: 'lucas@gmail.com',
				password: '667363',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
