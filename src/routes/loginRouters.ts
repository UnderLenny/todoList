import express from "express";
import * as loginController from "./../controllers/loginController";

const router = express.Router(); // Use express.Router() here

router.route("/").get(loginController.getLogin);

export default router;
