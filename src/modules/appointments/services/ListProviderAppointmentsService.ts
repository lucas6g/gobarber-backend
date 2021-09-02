import { classToClass } from 'class-transformer';
import Appointment from '../infra/typeorm/entities/Appointment';
// usar um service para todas as funcionalidades

// uso para me cominicar com a camada de infra
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';

// tipando os dados da requisicao
interface IRequest {
	provider_id: string;
	month: number;
	day: number;
	year: number;
}

class ListProviderAppointmentsService {
	private appointmentRepository: IAppointmentRepository;

	private cacheProvider: ICacheProvider;

	// lista o agendamentos de um dia de um prestador especifico

	// precissa receber uma variavel do tipo da interface
	constructor(
		appointmentRepository: IAppointmentRepository,
		cacheProvider: ICacheProvider,
	) {
		this.appointmentRepository = appointmentRepository;
		this.cacheProvider = cacheProvider;
	}

	public async execute({
		day,
		month,
		provider_id,
		year,
	}: IRequest): Promise<Appointment[]> {
		let appointments = await this.cacheProvider.recover<Appointment[]>(
			`provider-appointements-list:${provider_id}-${year}-${month}-${day}`,
		);
			if(!appointments){

				appointments = await this.appointmentRepository.findAllAppointmentsInDay({
					day,
					month,
					provider_id,
					year,
				});

				await this.cacheProvider.save(
					// para nao usar o mesmo cache em todos os providers
					`provider-appointements-list:${provider_id}-${year}-${month}-${day}`,
					classToClass(appointments),
				);
			}


		return appointments;
	}
}

export default ListProviderAppointmentsService;
