import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		const hashedPayload = await hash(payload, 10);
		return hashedPayload;
	}

	public async compareHash(
		payload: string,
		hashedPayload: string,
	): Promise<boolean> {
		const isPayload = await compare(payload, hashedPayload);
		return isPayload;
	}
}

export default BCryptHashProvider;
