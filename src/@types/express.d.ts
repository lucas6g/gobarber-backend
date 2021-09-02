// incluindo dentro do express um tipo novo

declare namespace Express {
	export interface Request {
		user: {
			id: string;
		};
	}
}
