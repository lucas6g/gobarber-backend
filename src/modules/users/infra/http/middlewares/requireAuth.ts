import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../../shared/errors/AppError';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const { authorization } = req.headers;

	if (!authorization) {
		throw new AppError('you most be login', 401);
	}

	const token = authorization.replace('Bearer ', '');

	try {
		const tokenDecodedInfo = verify(token, '97432d70685f8226318ff51fd80cd634');

		// tipando um obejeto dentro de uma variavel
		// fazemos isso quando a variavel não possui um tipo definido de retorno
		// isso é problema de tipagem
		const { sub } = tokenDecodedInfo as TokenPayload;
		req.user = {
			id: sub,
		};
		return next();
	} catch {
		throw new AppError('invalid jwt token', 401);
	}

	// obejeto payload armazena a informacao que o jwt esta criptografando
}
