import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('ShowProfile', () => {




	it('should show user profile', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const showProfile = new ShowProfileService(fakeUserRepository);

		const user = await fakeUserRepository.create({
			name: 'lucas',
			email: 'email@gmail.com',
			password: 'senha123',
		});
		const profile = await showProfile.execute(user.id);

		expect(profile.email).toBe('email@gmail.com');
		expect(profile.name).toBe('lucas');
	});
	it('should not show user profile if user does not exists', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const showProfile = new ShowProfileService(fakeUserRepository);

		await expect(
			showProfile.execute('id que nao existe'),
		).rejects.toBeInstanceOf(AppError);
	});
});
