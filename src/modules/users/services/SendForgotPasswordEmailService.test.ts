import AppError from '../../../shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '../../../shared/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

// test variavel global do jest
// usar it ou test para testar
describe('SendForgotPasswordEmail', () => {
	it('should send an email', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeMailProvider = new FakeMailProvider();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUserRepository,
			fakeMailProvider,
			fakeUserTokenRepository,
		);
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUserRepository.create({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: '12030',
		});

		await sendForgotPasswordEmail.execute({ email: 'lucas@gmail.com' });

		expect(sendMail).toHaveBeenCalled();
	});
	it('should not send an email if user does not exists', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeMailProvider = new FakeMailProvider();
		const fakeUserTokenRepository = new FakeUserTokensRepository();
		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUserRepository,
			fakeMailProvider,
			fakeUserTokenRepository,
		);

		await expect(
			sendForgotPasswordEmail.execute({ email: 'lucas' }),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should generate a forgot password token', async () => {
		const fakeUserRepository = new FakeUserRepository();
		const fakeMailProvider = new FakeMailProvider();
		const fakeUserTokenRepository = new FakeUserTokensRepository();

		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUserRepository,
			fakeMailProvider,
			fakeUserTokenRepository,
		);

		const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

		const user = await fakeUserRepository.create({
			name: 'lucas',
			email: 'lucas@gmail.com',
			password: '12030',
		});

		await sendForgotPasswordEmail.execute({ email: 'lucas@gmail.com' });

		await expect(generate).toBeCalledWith(user.id);
	});
});
