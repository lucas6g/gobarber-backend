import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface ISendMailDTO {
	to: {
		name: string;
		email: string;
	};
	from?: {
		name: string;
		email: string;
	};
	subject: string;
	templateData: IParseMailTemplateDTO;
}

export default ISendMailDTO;
