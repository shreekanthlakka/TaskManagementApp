import express from "express";
import { body, checkSchema } from "express-validator";
import {
    getLoggedInUserDetails,
    login,
    logout,
    register,
} from "../controllers/user.controller.js";
import { userValidationSchema } from "../validators/userValidationSchema.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.route("/register").post(checkSchema(userValidationSchema), register);
router
    .route("/login")
    .post(
        body("email")
            .exists()
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Input valid Email"),
        body("password").exists().notEmpty().trim(),
        login
    );

router.route("/logout").post(isLoggedIn, logout);
router.route("/loggedInuser").get(isLoggedIn, getLoggedInUserDetails);

export default router;
