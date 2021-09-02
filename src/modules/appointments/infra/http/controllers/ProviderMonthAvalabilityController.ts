import { Response, Request } from 'express';

import AppointmentRepository from '../../typeorm/repository/AppointmentsRepository';
import ListProviderAvalableMonthService from '../../../services/ListProviderAvailableMonthService';

class ProviderMonthAvalabilityController {
	public async index(req: Request, res: Response): Promise<Response> {
		const { provider_id } = req.params;
		const { month, year } = req.query;

		const listMonthAvaible = new ListProviderAvalableMonthService(
			new AppointmentRepository(),
		);

		const daysAvalable = await listMonthAvaible.execute({
			month: Number(month),
			provider_id,
			year: Number(year),
		});

		return res.status(200).json(daysAvalable);
	}
}

export default ProviderMonthAvalabilityController;
