import { Response, Request } from 'express';

import AppointmentRepository from '../../typeorm/repository/AppointmentsRepository';
import ListProviderAvalibleSchedulesInDayService from '../../../services/ListProviderAvalibleSchedulesInDayService';

class ProviderAvalibleSchedulesInDayController {
	public async index(req: Request, res: Response): Promise<Response> {
		const { provider_id } = req.params;
		const { month, year, day } = req.query;

		const listProviderAvalibleSchedulesInDay = new ListProviderAvalibleSchedulesInDayService(
			new AppointmentRepository(),
		);

		const avalableSchedules = await listProviderAvalibleSchedulesInDay.execute({
			month: Number(month),
			provider_id,
			year: Number(year),
			day: Number(day),
		});

		return res.status(200).json(avalableSchedules);
	}
}

export default ProviderAvalibleSchedulesInDayController;
