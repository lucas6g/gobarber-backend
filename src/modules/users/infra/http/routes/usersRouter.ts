import { Router } from 'express';

import multer from 'multer';

import { celebrate, Segments, Joi } from 'celebrate';
import requireAuth from '../middlewares/requireAuth';
import uploadConfig from '../../../../../config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(uploadConfig);
// colocar tudo que estiver relacionado ao usuario dentro dessas rotas
const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

// sempre na rota criar um trycat quando não estiver usando um medleware
usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().required().email(),
			password: Joi.string().required(),
			name: Joi.string().required(),
		},
	}),
	userController.create,
);

// quando quero atualizar apenas uma unica info do users uso o metodo pach
usersRouter.patch(
	'/avatar',
	requireAuth,
	upload.single('avatar'),
	userAvatarController.update,
);

export default usersRouter;
