import express from "express";
import { checkSchema, param } from "express-validator";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
} from "../controllers/task.controller.js";
import { isLoggedIn, customRole } from "../middlewares/isLoggedIn.js";
import { taskValidationSchema } from "../validators/taskValidationSchema.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router
    .route("/")
    .get(isLoggedIn, customRole(["admin", "user"]), getAllTasks)
    .post(
        isLoggedIn,
        customRole(["admin", "user"]),
        upload.single("taskfile"),
        // checkSchema(taskValidationSchema),
        createTask
    );
router
    .route("/:taskId")
    .get(
        isLoggedIn,
        customRole(["admin", "user"]),
        param("taskId")
            .exists()
            .notEmpty()
            .isMongoId()
            .withMessage("provide valid mongo id"),
        getTask
    )
    .put(
        isLoggedIn,
        customRole(["admin", "user"]),
        param("taskId")
            .exists()
            .notEmpty()
            .isMongoId()
            .withMessage("provide valid mongo id"),
        updateTask
    )
    .delete(
        isLoggedIn,
        customRole(["admin", "user"]),
        param("taskId")
            .exists()
            .notEmpty()
            .isMongoId()
            .withMessage("provide valid mongo id"),
        deleteTask
    );

export default router;
