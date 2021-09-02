import ListProviderAvailableMonthService from './ListProviderAvailableMonthService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('ListProviderAvailableDays', () => {
	it('shoult list all available days from a provider', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const listProviderAvailableDays = new ListProviderAvailableMonthService(
			fakeAppointmentsRepository,
		);

		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 8, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 9, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 10, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 11, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 12, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 13, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 14, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 15, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 16, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider id',
			date: new Date(2020, 4, 20, 17, 0, 0),
			user_id: 'user id',
		});

		const avalibleDays = await listProviderAvailableDays.execute({
			month: 5,
			year: 2020,
			provider_id: 'provider id',
		});

		expect(avalibleDays).toEqual(
			expect.arrayContaining([{ day: 20, avaible: false }]),
		);
	});
});
