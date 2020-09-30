import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error('JWT token is missing');
	}

	// format: Bearer real_token
	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);

		// force decoded type as TokenPayload
		const { sub } = decoded as TokenPayload;

		/**
		 * Teremos o id do usuário em todas nossa rotas que são autenticadas.
		 */
		request.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new Error('Invalid JWT token');
	}
}
