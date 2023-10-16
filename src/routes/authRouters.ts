import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.route('/').get(authController.getAuthView).post(authController.authUser);

export default router;
