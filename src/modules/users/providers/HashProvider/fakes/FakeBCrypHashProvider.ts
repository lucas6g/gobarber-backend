import IHashProvider from '../models/IHashProvider';

/*
	criando um fake do provider de hash
	para que nos testes nao pressizamos
	depender diretamento da lib bcrypt
	os teste so podem depender deles mesmos


*/

class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return payload;
	}

	public async compareHash(
		payload: string,
		hashedPayload: string,
	): Promise<boolean> {
		return payload === hashedPayload;
	}
}

export default BCryptHashProvider;
