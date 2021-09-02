// tipando os dados da requisicao
import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	provider_id: string;
	month: number;
	year: number;
}
// mostra os dias disponiveis em um mes para agendamento

type IResponse = Array<{
	day: number;
	avaible: boolean;
}>;

class ListProviderAvailableMonthService {
	private appointmentRepository: IAppointmentsRepository;

	constructor(appointmentRepository: IAppointmentsRepository) {
		this.appointmentRepository = appointmentRepository;
	}

	public async execute({
		provider_id,
		month,
		year,
	}: IRequest): Promise<IResponse> {
		const appointmentsInMonth = await this.appointmentRepository.findAllAppoitmentsInMonth(
			{
				provider_id,
				month,
				year,
			},
		);

		const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

		const daysArray = [];

		for (let i = 1; i <= numberOfDaysInMonth; i += 1) {
			daysArray.push(i);
		}

		// pegando todos os agendamentos de um dia especifico
		const avaiableAppointments = daysArray.map(day => {
			const compareDate = new Date(year, month - 1, day, 23, 59, 59);

			const appointmentsInOneDay = appointmentsInMonth.filter(appointment => {
				return getDate(appointment.date) === day;
			});

			if (
				appointmentsInOneDay.length < 10 &&
				isAfter(compareDate, new Date())
			) {
				return {
					day,
					avaible: true,
				};
			}

			return {
				day,
				avaible: false,
			};

			// quer dizer que o barbeiro tem um dia disponivel naquele mes
		});

		return avaiableAppointments;
	}
}

export default ListProviderAvailableMonthService;
