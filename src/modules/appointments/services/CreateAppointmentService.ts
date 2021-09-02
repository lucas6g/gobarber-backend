import {
	startOfHour,
	isBefore,
	getHours,
	format,
	getMonth,
	getDate,
	getYear,
} from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
// o cada service deve executar apenas uma funcao e retornar algo

// essa classe de service nao pode se comunicar diretamente com a camada de infra
// entao usamos essa interface para que aja essa comunicacao
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationRepository from '../../notifications/repositories/INotificationRepository';
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';

interface Request {
	date: Date;
	user_id: string;
	provider_id: string;
}

class CreateAppointmentService {
	// para usar o repositorio devemos usar a funcao getCustomrepository
	private appointmentsRepository: IAppointmentsRepository;

	private notificationRepository: INotificationRepository;

	private cacheProvider: ICacheProvider;

	constructor(
		appointmentsRepository: IAppointmentsRepository,
		notificationRepository: INotificationRepository,
		cacheProvider: ICacheProvider,
	) {
		this.appointmentsRepository = appointmentsRepository;
		this.notificationRepository = notificationRepository;
		this.cacheProvider = cacheProvider;
	}

	public async execute({
		date,
		provider_id,
		user_id,
	}: Request): Promise<Appointment> {
		// funcao que converte a hora da data para o começo
		const appointmentDate = startOfHour(date);

		const currentDate = new Date(Date.now());

		if (isBefore(appointmentDate, currentDate)) {
			throw new AppError('appointement in past date ');
		}

		if (provider_id === user_id) {
			throw new AppError('you can not create an appintment whit yourself');
		}
		const appointmentHour = getHours(appointmentDate);
		if (appointmentHour < 8 || appointmentHour > 17) {
			throw new AppError(
				'you can not create an appointment out of avaible schedule',
			);
		}

		const appointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
			provider_id,
		);

		if (appointmentInSameDate) {
			throw new AppError('this appointment is already agendado');
		}

		// esse metodo do repositorio apenas cria a instacia do model mais não salva no banco
		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
			user_id,
		});

		const year = getYear(appointmentDate);
		const month = getMonth(appointmentDate);
		const day = getDate(appointmentDate);

		const cacheKey = `provider-appointements-list:${provider_id}-${year}-${
			month + 1
		}-${day}`;

		await this.cacheProvider.invalidate(cacheKey);

		// formatando a data para a notificacao
		const formatDate = format(appointment.date, "dd/MM/yyyy 'ás' HH:mm");

		await this.notificationRepository.create({
			user_id: appointment.provider_id,
			content: `Novo Agendamento para ${formatDate}`,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
