import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.route('/').get(authController.getAuthView);
router.post('/registration', authController.registration);
router.post('/login', authController.login);
export default router;
