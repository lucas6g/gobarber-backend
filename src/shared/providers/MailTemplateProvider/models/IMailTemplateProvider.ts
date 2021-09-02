import IParseMailTamplateDTO from '../dtos/IParseMailTemplateDTO';

interface IMailTamplateProvider {
	parse(data: IParseMailTamplateDTO): Promise<string>;
}

export default IMailTamplateProvider;
