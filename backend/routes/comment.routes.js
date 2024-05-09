import express from "express";
const router = express.Router();
import { customRole, isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
    createComment,
    getAllComments,
    getCommentById,
    updateCommentById,
    deleteCommentById,
    deleteAllCommentByTaskId,
} from "../controllers/comment.controller.js";

router
    .route("/")
    .post(isLoggedIn, customRole(["admin", "user"]), createComment)
    .get(isLoggedIn, customRole(["admin", "user"]), getAllComments);

router
    .route("/:commentId")
    .get(isLoggedIn, customRole(["admin", "user"]), getCommentById)
    .put(isLoggedIn, customRole(["admin", "user"]), updateCommentById)
    .delete(isLoggedIn, customRole(["admin", "user"]), deleteCommentById);
router
    .route("/deleteAllComments/:taskId")
    .post(isLoggedIn, customRole(["admin", "user"]), deleteAllCommentByTaskId);

export default router;
