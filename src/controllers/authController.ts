// authController.ts
import { Request, Response } from 'express';
import User from './../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signToken = (id: string | number): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET || 'test', {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

export class AuthController {
	async getLogin(req: Request, res: Response): Promise<void> {
		try {
			res.render('register');
		} catch (err) {
			console.log(err);
		}
	}

	async registration(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const candidate = await User.findOne({ email });
			if (candidate) {
				res.status(400).json({
					status: 'fail',
					message: 'Пользователь с такой почтой уже зарегистрирован'
				});
				return;
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const user = new User({ email, password: hashPassword });
			console.log(user);
			await user.save();
			res.status(200).json({
				status: 'success',
				message: 'Пользователь успешно зарегистрирован'
			});
			return;
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: 'Registration error' });
		}
	}

	async login(req: Request, res: Response): Promise<void> {
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
					const token = signToken(user._id);
					res.status(400).json({
						status: 'Success',
						token: token
					});
					return;
				}
			}
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: 'Login error' });
		}
	}

	async getUser(req: Request, res: Response): Promise<void> {
		try {
			res.json('server work');
		} catch (err) {
			console.log(err);
		}
	}
}
