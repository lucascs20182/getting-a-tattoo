// authenticate user service

import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body;

		const session = new CreateSessionService();

		const { user } = await session.execute({
			email,
			password,
		});

		return response.json({
			name: user.name,
			email: user.email,
			id: user.id,
			created_at: user.created_at,
			updated_at: user.updated_at,
		});
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default sessionsRouter;
