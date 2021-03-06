import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const resetPassworController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
	'/forgot',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required(),
		},
	}),
	forgotPasswordController.create,
);
passwordRouter.post(
	'/reset',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			newPassword: Joi.string().required(),
			newPasswordConfirmation: Joi.string()
				.required()
				.valid(Joi.ref('newPassword')),
		},
	}),
	resetPassworController.create,
);

export default passwordRouter;
