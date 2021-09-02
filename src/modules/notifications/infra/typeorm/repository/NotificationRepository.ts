import { getMongoRepository, MongoRepository } from 'typeorm';

// chamamos de schema as entidades do mongodb
import Notification from '../schemas/Notification';

import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';

// a classe de repositorio tem que cumprir o comtrado independente do orm que for utilizado
import INotificationRepository from '../../../repositories/INotificationRepository';
// cada model tera seu repositorio sua camada de dados para se comunicar com o banco

class NotificationRepository implements INotificationRepository {
	private ormRepository: MongoRepository<Notification>;

	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({
		content,
		user_id,
	}: ICreateNotificationDTO): Promise<Notification> {
		const notification = this.ormRepository.create({
			content,
			user_id,
		});

		await this.ormRepository.save(notification);

		return notification;
	}
}

export default NotificationRepository;
