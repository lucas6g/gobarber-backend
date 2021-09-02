import AppError from '../../../shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ResetUserPasswordService from './ResetUserPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCrypHashProvider';

// test variavel global do jest
// usar it ou test para testar
describe('ResetUserPassword', () => {
	it('should reset user password ', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const fakeHashProvider = new FakeHashProvider();

		const resetUserPassword = new ResetUserPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeHashProvider,
		);

		let user = await fakeUserRepository.create({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: 'lucas1533',
		});

		const { token } = await fakeUserTokenRepository.generate(user.id);

		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		await resetUserPassword.execute({ newPassword: '102030', token });

		user = await fakeUserRepository.findById(user.id);

		expect(generateHash).toBeCalledWith('102030');
		expect(user.password).toEqual('102030');
	});

	it('should not reset user password if token does not exists', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const fakeHashProvider = new FakeHashProvider();

		const resetUserPassword = new ResetUserPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeHashProvider,
		);

		await expect(
			resetUserPassword.execute({
				newPassword: '102030',
				token: 'not exists',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not reset user password if user does not exists', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const fakeHashProvider = new FakeHashProvider();

		const resetUserPassword = new ResetUserPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeHashProvider,
		);

		const { token } = await fakeUserTokenRepository.generate(
			'not existent user id',
		);

		await expect(
			resetUserPassword.execute({
				newPassword: '102030',
				token,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not reset user password if token expires', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const fakeHashProvider = new FakeHashProvider();

		const resetUserPassword = new ResetUserPasswordService(
			fakeUserRepository,
			fakeUserTokenRepository,
			fakeHashProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: 'lucas1533',
		});

		const { token } = await fakeUserTokenRepository.generate(user.id);

		jest.spyOn(Date, 'now').mockImplementation(() => {
			const customDate = new Date();

			return customDate.setHours(customDate.getHours() + 3);
		});

		await expect(
			resetUserPassword.execute({
				newPassword: '102030',
				token,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
