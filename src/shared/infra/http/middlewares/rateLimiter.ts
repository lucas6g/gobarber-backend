import { NextFunction, Request, Response } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '../../../errors/AppError';

// quando o user fizer a req vamos aramazenar o ip e a quanti de reqs que ele fez
// usando o redis

const redisClient = redis.createClient({
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD || undefined,
});

// o user so pode fazer 5 req em um segundo
const limiter = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'ratelimit',
	points: 5, // 5 requests
	duration: 1, // per 1 second by IP
});

export default async function rateLimiter(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		await limiter.consume(req.ip);
		return next();
	} catch (error) {
		throw new AppError('to many request', 429);
	}
}
