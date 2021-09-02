import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
	private messages: Array<ISendMailDTO> = [];

	public async sendMail(message: ISendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}

export default FakeMailProvider;
