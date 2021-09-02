import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviders', () => {
	it('should list all appointments from provider on specifiqui day', async () => {
		const fakeAppointmentsRespository = new FakeAppointmentRepository();
		const fakeUserRepository = new FakeUsersRepository();
		const fakeCacheProvider = new FakeCacheProvider();
		const listProviderAppointments = new ListProviderAppointmentsService(
			fakeAppointmentsRespository,
			fakeCacheProvider,
		);

		const provider = await fakeUserRepository.create({
			email: 'email',
			name: 'lucas',
			password: '123456',
		});

		const appointment = await fakeAppointmentsRespository.create({
			date: new Date(2021, 0, 4, 15),
			user_id: 'user id',
			provider_id: provider.id,
		});

		const appointments = await listProviderAppointments.execute({
			provider_id: provider.id,
			day: 4,
			month: 1,
			year: 2021,
		});

		expect(appointments).toEqual(expect.arrayContaining([appointment]));
	});
});
