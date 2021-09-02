import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import FakeNotificationRepository from '../../notifications/repositories/fakes/FakeNotificationRepository';
import AppError from '../../../shared/errors/AppError';
import FakeCacheProvider from '../../../shared/providers/CacheProvider/fakes/FakeCacheProvider';

// test variavel global do jest
// usar it ou test para testar
describe('CreateAppointment', () => {
	it('should create a new appointment', async () => {
		const appointmentRepository = new FakeAppointmentsRepository();
		const fakeNotificationRepository = new FakeNotificationRepository();
		const fakeCacheProvider = new FakeCacheProvider();

		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
			fakeNotificationRepository,
			fakeCacheProvider,
		);
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			// quando invocar a funcao now retornar essa data
			return new Date(2020, 4, 10, 12).getTime();
		});

		const createdAppointment = await createAppointment.execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: 'sdnjsdnjsaldns',
			user_id: 'dnsjdsjndjsn',
		});
		expect(createdAppointment).toHaveProperty('id');
		expect(createdAppointment.provider_id).toBe('sdnjsdnjsaldns');
	});

	it('should not create a new appointment at same date', async () => {
		const appointmentRepository = new FakeAppointmentsRepository();
		const fakeNotificationRepository = new FakeNotificationRepository();
		const fakeCacheProvider = new FakeCacheProvider();
		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
			fakeNotificationRepository,
			fakeCacheProvider,
		);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			// quando invocar a funcao now retornar essa data
			return new Date(2020, 4, 10, 12).getTime();
		});
		const appointmentDate = new Date(2020, 4, 10, 13);

		await createAppointment.execute({
			date: appointmentDate,
			provider_id: 'provider id',
			user_id: 'user id',
		});

		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: 'provider id',
				user_id: 'user id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not create an appointment at past date', async () => {
		const appointmentRepository = new FakeAppointmentsRepository();
		const fakeNotificationRepository = new FakeNotificationRepository();
		const fakeCacheProvider = new FakeCacheProvider();
		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
			fakeNotificationRepository,
			fakeCacheProvider,
		);
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			// quando invocar a funcao now retornar essa data
			return new Date(2020, 4, 20, 12, 0).getTime();
		});

		const appointmentDate = new Date(2020, 4, 20, 11, 0);
		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: 'provider id',
				user_id: 'user id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not create an appointment whit the same user as a provider ', async () => {
		const appointmentRepository = new FakeAppointmentsRepository();
		const fakeNotificationRepository = new FakeNotificationRepository();
		const fakeCacheProvider = new FakeCacheProvider();
		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
			fakeNotificationRepository,
			fakeCacheProvider,
		);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			// quando invocar a funcao now retornar essa data
			return new Date(2020, 4, 20, 12).getTime();
		});

		const appointmentDate = new Date(2020, 4, 20, 13);
		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: 'provider id',
				user_id: 'provider id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not create an appointment outside the avaible schedule', async () => {
		const appointmentRepository = new FakeAppointmentsRepository();
		const fakeNotificationRepository = new FakeNotificationRepository();
		const fakeCacheProvider = new FakeCacheProvider();
		const createAppointment = new CreateAppointmentService(
			appointmentRepository,
			fakeNotificationRepository,
			fakeCacheProvider,
		);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			// quando invocar a funcao now retornar essa data
			return new Date(2020, 4, 20, 12).getTime();
		});

		await expect(
			createAppointment.execute({
				date: new Date(2020, 4, 21, 7),
				provider_id: 'provider id',
				user_id: 'user id',
			}),
		).rejects.toBeInstanceOf(AppError);

		await expect(
			createAppointment.execute({
				date: new Date(2020, 4, 21, 18),
				provider_id: 'provider id',
				user_id: 'user id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
