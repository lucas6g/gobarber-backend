// tipando os dados da requisicao
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// tras os horarios disponiveis em um dia para um agendamento

interface IRequest {
	provider_id: string;
	month: number;
	year: number;
	day: number;
}

type IResponse = Array<{
	hour: number;
	avaible: boolean;
}>;

class ListProviderAvalibleSchedulesInDayService {
	private appointmentRepository: IAppointmentsRepository;

	constructor(appointmentRepository: IAppointmentsRepository) {
		this.appointmentRepository = appointmentRepository;
	}

	public async execute({
		provider_id,
		month,
		year,
		day,
	}: IRequest): Promise<IResponse> {
		const appointementsInDay = await this.appointmentRepository.findAllAppointmentsInDay(
			{ day, month, provider_id, year },
		);
		const hourStart = 8;
		const hourEnd = 17;

		const schedulesArray = [];

		for (let i = hourStart; i <= hourEnd; i += 1) {
			schedulesArray.push(i);
		}

		const currentDate = new Date(Date.now());

		const avaibleSchedulesInDay = schedulesArray.map(hour => {
			const hasAppointmentInSchedule = appointementsInDay.find(appointment => {
				return getHours(appointment.date) === hour;
			});
			const comparaDate = new Date(year, month - 1, day, hour);

			// para que nao mostra agendamentos em horarios indisponiveis
			if (!hasAppointmentInSchedule && isAfter(comparaDate, currentDate)) {
				return {
					hour,
					avaible: true,
				};
			}

			return {
				hour,
				avaible: false,
			};
		});

		return avaibleSchedulesInDay;
	}
}

export default ListProviderAvalibleSchedulesInDayService;
