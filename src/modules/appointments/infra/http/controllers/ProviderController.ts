import { Response, Request } from 'express';

import UserRepository from '../../../../users/infra/typeorm/repositories/UsersRepository';
import ListProvidersService from '../../../services/ListProvidersService';
import CacheProvider from '../../../../../shared/providers/CacheProvider/implementation/RedisCacheProvider'
import {classToClass} from 'class-transformer'

class ProviderController {
	public async index(req: Request, res: Response): Promise<Response> {
		const exeptUserId = req.user.id;

		const listProviderService = new ListProvidersService(new UserRepository(),new CacheProvider());

		const providers = await listProviderService.execute(exeptUserId);

		return res.status(200).json(classToClass(providers));
	}
}

export default ProviderController;
