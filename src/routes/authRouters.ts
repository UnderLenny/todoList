// authRouter.ts
import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.route('/').get(authController.getLogin.bind(authController));
router.post('/registration', authController.registration.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/users', authController.getUser.bind(authController));
export default router;
