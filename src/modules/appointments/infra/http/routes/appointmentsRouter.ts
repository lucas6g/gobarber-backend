import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// usado pelos dois modulos de dominio user e appointment
import requireAuth from '../../../../users/infra/http/middlewares/requireAuth';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointementsController';

const appointmentRoute = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRoute.use(requireAuth);

appointmentRoute.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			provider_id: Joi.string().uuid().required(),
			date: Joi.date(),
		},
	}),
	appointmentController.create,
);
appointmentRoute.get('/me', providerAppointmentsController.index);

export default appointmentRoute;
