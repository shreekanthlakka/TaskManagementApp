import express from "express";
import { customRole, isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
    endTimeTracker,
    getAllTimeTrackers,
    startTimeTracker,
    deleteTimer,
} from "../controllers/timeTracker.controller.js";
const router = express.Router();

router
    .route("/:taskId")
    .get(isLoggedIn, customRole(["admin", "user"]), getAllTimeTrackers)
    .delete(isLoggedIn, customRole(["admin", "user"]), deleteTimer);

router
    .route("/start/:taskId")
    .post(isLoggedIn, customRole(["admin", "user"]), startTimeTracker);

router
    .route("/end/:id")
    .post(isLoggedIn, customRole(["admin", "user"]), endTimeTracker);

export default router;
