import { NextFunction, Request, Response } from 'express';
import AppError from '../../../errors/AppError';

export default function handleErrors(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}
	// para debugar esse erro que não foi gerado pela minha aplicacão
	console.error(err);
	// retornar esse internal caso seja um error que não esperavamos
	return res.status(500).json({
		status: 'error',
		message: 'internal server error',
	});
}
