import express from 'express';
import * as onboardingController from './../controllers/onboardingController';

const router = express.Router();

router
	.route('/')
	.get(onboardingController.getOnboardingView)
	.post(onboardingController.getMail);

export default router;
