import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';
// appointment repository do type orm
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

// a classe de repositorio tem que cumprir o comtrado independente do orm que for utilozado
import INotificationRepository from '../INotificationRepository';

// cada model tera seu repositorio sua camada de dados para se comunicar com o banco

class FakeAppointmentRepository implements INotificationRepository {
	private notifications: Array<Notification> = [];

	public async create({
		content,
		user_id,
	}: ICreateNotificationDTO): Promise<Notification> {
		const notification = new Notification();

		Object.assign(notification, { id: new ObjectID(), user_id, content });
		this.notifications.push(notification);

		return notification;
	}
}

export default FakeAppointmentRepository;
