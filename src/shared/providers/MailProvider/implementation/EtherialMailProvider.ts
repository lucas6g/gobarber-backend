import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import MailTemplateProvider from '../../MailTemplateProvider/implementation/HandleBarsMailTemplateProvider';

class EtherialMailProvider implements IMailProvider {
	private client: Transporter;

	private mailTemplateProvider: IMailTemplateProvider;

	constructor() {
		// um provider pode dempender de outro provider
		this.mailTemplateProvider = new MailTemplateProvider();
		nodemailer.createTestAccount().then(account => {
			this.client = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});
		});
	}

	public async sendMail({
		to,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const info = await this.client.sendMail({
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});

		console.log('Message sent: %s', info.messageId);
		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}
}

// gerar um singleton dessa classe
export default new EtherialMailProvider();
