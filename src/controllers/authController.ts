import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const getAuthView = async (req: Request, res: Response): Promise<void> => {
	try {
		res.render('auth');
	} catch (err) {
		console.log(err);
	}
};

const signToken = (id: string | number): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET || 'test', {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({
					status: 'fail',
					message: `Аккаунт с почтой ${email} не найден`
				}
			);
			return;
		} else {
			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				res.status(400).json({
					status: 'fail',
					message: 'Неверный пароль'
				});
			} else {
				// const token = signToken(user._id);
				// res.status(200).json({
				// 	status: 'Success',
				// 	token: token
				// });
				// return;
				res.redirect('/api/v1/tasks');
			}
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: 'Login error' });
	}
};