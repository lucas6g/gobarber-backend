import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '../../../shared/errors/AppError';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

// test variavel global do jest
// usar it ou test para testar
describe('CreateUser', () => {
	it('should create a new user', async () => {
		const userRepository = new FakeUserRepository();

		const createUser = new CreateUserService(
			userRepository,
			new BCryptHashProvider(),
			new FakeCacheProvider(),
		);

		const createdUser = await createUser.execute({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: '102030',
		});
		expect(createdUser).toHaveProperty('id');
	});
	it('should not create a new user with same email', async () => {
		const userRepository = new FakeUserRepository();
		const createUser = new CreateUserService(
			userRepository,
			new BCryptHashProvider(),
			new FakeCacheProvider(),
		);

		const userEmail = 'lucas@gmail.com';

		await createUser.execute({
			name: 'lucas',
			email: userEmail,
			password: '102030',
		});

		await expect(
			createUser.execute({
				name: 'lucas',
				email: userEmail,
				password: '102030',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
