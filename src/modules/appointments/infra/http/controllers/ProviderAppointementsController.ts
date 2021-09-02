import { Response, Request } from 'express';

import { classToClass } from 'class-transformer';
import AppointmentRepository from '../../typeorm/repository/AppointmentsRepository';
import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementation/RedisCacheProvider';

class ProviderAppointementsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const provider_id = req.user.id;
		const { month, year, day } = req.query;

		const listProviderAppointmentsService = new ListProviderAppointmentsService(
			new AppointmentRepository(),
			new RedisCacheProvider(),
		);

		const appointments = await listProviderAppointmentsService.execute({
			month: Number(month),
			provider_id,
			year: Number(year),
			day: Number(day),
		});

		return res.status(200).json(classToClass(appointments));
	}
}

export default ProviderAppointementsController;
