import { v4 as uuidv4 } from 'uuid';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';
// appointment repository do type orm
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IFindAppointmentsInMonthDTO from '../../dtos/IFindAppointmentsInMonthDTO';
import IFindAppointmentInDayDTO from '../../dtos/IFindAllAppointmentsInDayDTO';

// a classe de repositorio tem que cumprir o comtrado independente do orm que for utilozado
import IAppointmentRepository from '../IAppointmentsRepository';

// cada model tera seu repositorio sua camada de dados para se comunicar com o banco

class FakeAppointmentRepository implements IAppointmentRepository {
	private appointments: Array<Appointment> = [];

	public async create({
		provider_id,
		date,
		user_id,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		appointment.id = uuidv4();
		appointment.user_id = user_id;
		appointment.provider_id = provider_id;
		appointment.date = date;

		this.appointments.push(appointment);

		return appointment;
	}

	public async findByDate(
		date: Date,
		provider_id: string,
	): Promise<Appointment | null> {
		const appoinmentsInSameDate = this.appointments.find(appointment => {
			// isEqual verifica se o horario das datas são iguais
			return (
				isEqual(appointment.date, date) &&
				appointment.provider_id === provider_id
			);
		});

		return appoinmentsInSameDate;
	}

	// serve para comprir a regra de negocio de que pelo menos um dia no mes vai ter agendamento disponivel

	public async findAllAppoitmentsInMonth({
		month,
		provider_id,
		year,
	}: IFindAppointmentsInMonthDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(appointment => {
			return (
				appointment.provider_id === provider_id &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year
			);
		});

		return appointments;
	}

	// busca os  agendamentos no dia
	public async findAllAppointmentsInDay({
		day,
		month,
		provider_id,
		year,
	}: IFindAppointmentInDayDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(appointment => {
			return (
				appointment.provider_id === provider_id &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year
			);
		});

		return appointments;
	}
}

export default FakeAppointmentRepository;
