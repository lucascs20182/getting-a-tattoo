import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		// the operand of a 'delete' operator must be optional
		// delete user.password;

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

export default usersRouter;
