import express from "express";
import * as registerController from "../controllers/registerController";

const router = express.Router(); // Use express.Router() here

router.route("/").get(registerController.getLogin);

export default router;
