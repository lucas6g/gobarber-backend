import Redis, { Redis as IRedis } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '../../../../config/redis';

class RedisCacheProvider implements ICacheProvider {
	private client: IRedis;

	constructor() {
		this.client = new Redis(cacheConfig);
	}

	public async save(key: string, value: string): Promise<void> {
		await this.client.set(key, JSON.stringify(value));
	}

	// busca os dados do cache
	public async recover<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key);
		if (!data) {
			return null;
		}

		return JSON.parse(data) as T;
	}

	// invalida o cache especifico
	public async invalidate(key: string): Promise<void> {
		await this.client.del(key);
	}

	// usado para apagar varias cheves no banco
	public async invalidateWhitPrefix(prefix: string): Promise<void> {
		const keys = await this.client.keys(`${prefix}:*`);

		// para executaar varias operacoes ao mesmo tempo usar um pipeline
		const pipeline = this.client.pipeline();

		keys.forEach(key => {
			pipeline.del(key);
		});

		await pipeline.exec();
	}
}

export default RedisCacheProvider;
