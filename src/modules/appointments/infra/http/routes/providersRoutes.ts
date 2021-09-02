import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// usado pelos dois modulos de dominio user e appointment
import requireAuth from '../../../../users/infra/http/middlewares/requireAuth';
import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvalabilityController from '../controllers/ProviderMonthAvalabilityController';
import ProviderAvalibleSchedulesInDayController from '../controllers/ProviderAvalibleSchedulesInDayController';

const providersRouter = Router();
const providerController = new ProviderController();
const providerMonthAvalabilityController = new ProviderMonthAvalabilityController();
const providerAvalibleSchedulesInDayController = new ProviderAvalibleSchedulesInDayController();

providersRouter.use(requireAuth);

providersRouter.get('/', providerController.index);

providersRouter.get(
	'/:provider_id/month-avalability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerMonthAvalabilityController.index,
);

providersRouter.get(
	'/:provider_id/day-avalability',
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
	}),
	providerAvalibleSchedulesInDayController.index,
);

export default providersRouter;
