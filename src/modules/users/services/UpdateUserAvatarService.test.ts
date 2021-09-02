import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '../../../shared/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UpdateUserAvatar', () => {
	it('should update user avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		const user = await fakeUsersRepository.create({
			name: 'lucas',
			email: 'email@gmail.com',
			password: 'senha123',
		});
		await updateUserAvatar.execute({
			user_id: user.id,
			avatar_file_name: 'avatar.jpg',
		});

		expect(user.avatar).toBe('avatar.jpg');
	});
	it('should no update user avatar if user does not exists', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		await expect(
			updateUserAvatar.execute({
				user_id: 'nao existe',
				avatar_file_name: 'avatar.jpg',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old user avatar to create new one ', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const user = await fakeUsersRepository.create({
			name: 'lucas',
			email: 'email@gmail.com',
			password: 'senha123',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatar_file_name: 'avatar.jpg',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatar_file_name: 'avatar2.jpg',
		});

		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
		expect(user.avatar).toBe('avatar2.jpg');
	});
});
