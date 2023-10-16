import express, { Request, Response } from 'express';
import { RegisterController } from '../controllers/registerController';

const router = express.Router();
const authController = new RegisterController();

router.route('/').get(authController.getRegisterView);
router.post('/submit', authController.registerUser);

export default router;
