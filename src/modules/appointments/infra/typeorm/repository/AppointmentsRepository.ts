import { getRepository, Repository, Raw } from 'typeorm';

import Appointment from '../entities/Appointment';

// appointment repository do type orm

import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IFindAppointmentsInMonthDTO from '../../../dtos/IFindAppointmentsInMonthDTO';
import IFindAllAppointmentsInDayDTO from '../../../dtos/IFindAllAppointmentsInDayDTO';

// a classe de repositorio tem que cumprir o comtrado independente do orm que for utilozado
import IAppointmentRepository from '../../../repositories/IAppointmentsRepository';
// cada model tera seu repositorio sua camada de dados para se comunicar com o banco

class AppointmentRepository implements IAppointmentRepository {
	private ormRepository: Repository<Appointment>;

	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	public async create({
		provider_id,
		user_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({
			provider_id,
			user_id,
			date,
		});
		await this.ormRepository.save(appointment);
		return appointment;
	}

	public async findByDate(
		date: Date,
		provider_id: string,
	): Promise<Appointment | undefined> {
		const appointment = await this.ormRepository.findOne({
			where: {
				date,
				provider_id,
			},
		});

		return appointment || null;
	}

	public async findAllAppoitmentsInMonth({
		month,
		provider_id,
		year,
	}: IFindAppointmentsInMonthDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				provider_id,
				date: Raw(
					dateFildname =>
						`to_char(${dateFildname}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
				),
			},
		});

		return appointments;
	}

	public async findAllAppointmentsInDay({
		day,
		month,
		provider_id,
		year,
	}: IFindAllAppointmentsInDayDTO): Promise<Appointment[]> {
		const parsedDay = String(day).padStart(2, '0');
		const parsedMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				provider_id,
				date: Raw(
					dateFildname =>
						`to_char(${dateFildname}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
				),
			},
			relations: ['user'],
		});

		return appointments;
	}
}

export default AppointmentRepository;
