import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAppointmentsInMonthDTO from '../dtos/IFindAppointmentsInMonthDTO';
import IFindAppointmentsInDayDTO from '../dtos/IFindAllAppointmentsInDayDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

// define as regras de como um repositorio de appointment deve ser criado
interface IAppointmentsRepository {
	create(appoinment: ICreateAppointmentDTO): Promise<Appointment>;
	findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

	findAllAppoitmentsInMonth({
		month,
		provider_id,
		year,
	}: IFindAppointmentsInMonthDTO): Promise<Appointment[]>;

	findAllAppointmentsInDay({
		day,
		month,
		provider_id,
		year,
	}: IFindAppointmentsInDayDTO): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
