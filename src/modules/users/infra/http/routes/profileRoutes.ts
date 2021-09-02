import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import requireAuth from '../middlewares/requireAuth';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(requireAuth);

profileRouter.get('/', profileController.show);
profileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			old_password: Joi.string().required(),
			newPassword: Joi.string().required(),
			newPasswordConfirmation: Joi.string()
				.required()
				.valid(Joi.ref('newPassword')),
		},
	}),

	profileController.update,
);

export default profileRouter;
