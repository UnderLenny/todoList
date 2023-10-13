import { Request, Response } from 'express';

export const getLogin = async (req: Request, res: Response): Promise<void> => {
	try {
		res.render('register');
	} catch (err) {
		console.log(err);
	}
};
