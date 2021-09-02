import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';
import FakeBCrypHashProvider from '../providers/HashProvider/fakes/FakeBCrypHashProvider';

describe('UpdateUserProfile', () => {
	it('should update user profile', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'lucas',
			email: 'email@gmail.com',
			password: 'senha123',
		});

		const updatedUser = await updateUserProfile.execute({
			name: 'teofalo',
			user_id: user.id,
			email: 'lucio@gmail.com',
		});
		expect(updatedUser.name).toBe('teofalo');
		expect(updatedUser.email).toBe('lucio@gmail.com');
	});

	it('should not be able update the profile from non-existing user', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);

		await expect(
			updateUserProfile.execute({
				user_id: 'invalid id',
				email: 'teste@gmail.com',
				name: 'teofalo',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to change to another user email', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);

		await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const user = await fakeUserRepository.create({
			name: 'Test',
			email: 'test@example.com',
			password: '123456',
		});

		await expect(
			updateUserProfile.execute({
				user_id: user.id,
				name: 'John Doe',
				email: 'johndoe@example.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);
		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const updatedUser = await updateUserProfile.execute({
			user_id: user.id,
			name: 'John Trê',
			email: 'johntre@example.com',
			old_password: '123456',
			newPassword: '123123',
		});

		expect(updatedUser.password).toBe('123123');
	});

	it('should not be able to update the password without old password', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			updateUserProfile.execute({
				user_id: user.id,
				name: 'John Trê',
				email: 'johntre@example.com',
				newPassword: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update the password with wrong old password', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeBCrypHashProvider();

		const updateUserProfile = new UpdateUserProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);

		const user = await fakeUserRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			updateUserProfile.execute({
				user_id: user.id,
				name: 'John Trê',
				email: 'johntre@example.com',
				old_password: 'wrong-old-password',
				newPassword: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
