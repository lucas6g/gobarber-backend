interface ITemplateVariables {
	[key: string]: string | number;
}

interface IParseMailTemplateDTO {
	// tamplate do html vai ser uma string
	file: string;

	variables: ITemplateVariables;
}

export default IParseMailTemplateDTO;
