import ListProviderAvalibleSchedulesInDayService from './ListProviderAvalibleSchedulesInDayService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('ListProviderAvalibleSchedulesInDay', () => {
	it('shoult list all available schedules in a day from a provider without schedules that have passed', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const listProviderAvalibleSchedulesInDay = new ListProviderAvalibleSchedulesInDayService(
			fakeAppointmentsRepository,
		);

		await fakeAppointmentsRepository.create({
			provider_id: 'user id',
			date: new Date(2020, 4, 20, 14, 0, 0),
			user_id: 'user id',
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'user id',
			date: new Date(2020, 4, 20, 15, 0, 0),
			user_id: 'user id',
		});

		jest.spyOn(Date, 'now').mockImplementation(() => {
			// quando invocar a funcao now a data atual vai ser essa
			return new Date(2020, 4, 20, 11).getTime();
		});

		const avaibleSchedules = await listProviderAvalibleSchedulesInDay.execute({
			month: 5,
			year: 2020,
			provider_id: 'user id',
			day: 20,
		});

		expect(avaibleSchedules).toEqual(
			expect.arrayContaining([
				{ hour: 14, avaible: false },
				{ hour: 15, avaible: false },
				{ hour: 10, avaible: false },
				{ hour: 16, avaible: true },
				{ hour: 8, avaible: false },
			]),
		);
	});
});
