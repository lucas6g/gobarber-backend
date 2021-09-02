import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import FakeDiskStorageProvider from '../../../../../shared/providers/StorageProvider/implementation/FakeDiskStorageProvider';
import S3StorageProvider from '../../../../../shared/providers/StorageProvider/implementation/S3StorageProvider';

class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const usersRepository = new UsersRepository();
		const fakeDiskStorageProvider = new FakeDiskStorageProvider();
		const s3StorageProvider = new S3StorageProvider();

		const avatar_file_name = req.file.filename;

		const updateUserAvatar = new UpdateUserAvatarService(
			usersRepository,
			s3StorageProvider,
		);
		// o service sempre retorna o que ele vai atualizar
		const user = await updateUserAvatar.execute({
			user_id,
			avatar_file_name,
		});

		return res.status(200).json(classToClass(user));
	}
}

export default UserAvatarController;
