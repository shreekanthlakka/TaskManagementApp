import express from "express";
import { customRole, isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
    getAllFilesByTaskId,
    uploadFilesController,
} from "../controllers/files.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/upload/:taskId").post(
    isLoggedIn,
    customRole(["admin", "user"]),
    // upload.fields([{ name: "taskfiles", maxCount: 10 }]),
    uploadFilesController
);
router
    .route("/:taskId")
    .get(isLoggedIn, customRole(["admin", "user"]), getAllFilesByTaskId);

export default router;
