import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateUserProfileService from '../../../services/UpdateUserProfileService';
import ShowProfileService from '../../../services/ShowProfileService';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class ProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;

		const showProfile = new ShowProfileService(new UsersRepository());

		const user = await showProfile.execute(user_id);

		return res.status(200).json(classToClass(user));
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { name, email, newPassword, old_password } = req.body;
		const user_id = req.user.id;

		const updateProfile = new UpdateUserProfileService(
			new UsersRepository(),
			new BCryptHashProvider(),
		);

		const user = await updateProfile.execute({
			name,
			email,
			old_password,
			user_id,
			newPassword,
		});

		delete user.password;

		return res.status(200).json(user);
	}
}

export default ProfileController;
