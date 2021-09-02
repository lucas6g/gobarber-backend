import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviders', () => {
	it('should list all providers ', async () => {
		const fakeUserRepository = new FakeUsersRepository();
		const fakeCacheProvider = new FakeCacheProvider();

		const listProviders = new ListProvidersService(
			fakeUserRepository,
			fakeCacheProvider,
		);

		const user1 = await fakeUserRepository.create({
			email: 'lucas@gmail.com',
			name: 'lucas',
			password: '123456',
		});
		const user2 = await fakeUserRepository.create({
			email: 'lucas2@gmail.com',
			name: 'lucas2',
			password: '123456',
		});
		const logedUser = await fakeUserRepository.create({
			email: 'lucas3@gmail.com',
			name: 'lucas3',
			password: '123456',
		});

		const providers = await listProviders.execute(logedUser.id);

		expect(providers).toEqual([user1, user2]);
	});
});
