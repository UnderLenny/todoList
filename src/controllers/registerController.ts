import { Request, Response } from 'express';
import User from './../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export class RegisterController {
	async getRegisterView(req: Request, res: Response): Promise<void> {
		try {
			res.render('register');
		} catch (err) {
			console.log(err);
		}
	}

	async registerUser(req: Request, res: Response): Promise<void> {
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
			// res.status(200).json({
			// 	status: 'success',
			// 	message: 'Пользователь успешно зарегистрирован'
			// });
			res.redirect('/api/v1/auth');
			return;
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: 'Registration error' });
		}
	}
}

