import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import MailTemplateProvider from '../../MailTemplateProvider/implementation/HandleBarsMailTemplateProvider';

class SESMailProvider implements IMailProvider {
	private client: Transporter;

	// mais generica
	private mailTemplateProvider: IMailTemplateProvider;

	constructor() {
		// um provider pode dempender de outro provider com esse  forte acloplamento
		this.mailTemplateProvider = new MailTemplateProvider();

		this.client = nodemailer.createTransport({
			SES: new aws.SES({
				apiVersion: '2010-12-01',
				region: 'sa-east-1',
			}),
		});
	}

	public async sendMail({
		from,
		to,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const info = await this.client.sendMail({
			from: {
				name: from.name,
				address: from.email,
			},

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
export default new SESMailProvider();
