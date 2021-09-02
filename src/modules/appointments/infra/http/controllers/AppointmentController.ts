import { Response, Request } from 'express';

import AppointmentRepository from '../../typeorm/repository/AppointmentsRepository';
import NotificationRepository from '../../../../notifications/infra/typeorm/repository/NotificationRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import RedisCacheProvider from '../../../../../shared/providers/CacheProvider/implementation/RedisCacheProvider';

class AppointmentsController {
	public async create(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const { provider_id, date } = req.body;

		const appointmentService = new CreateAppointmentService(
			new AppointmentRepository(),
			new NotificationRepository(),
			new RedisCacheProvider(),
		);

		const appointment = await appointmentService.execute({
			provider_id,
			date,
			user_id,
		});

		return res.status(201).json(appointment);
	}
}

export default AppointmentsController;
