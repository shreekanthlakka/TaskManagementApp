import TimeTracker from "../models/timeTracker.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";

const startTimeTracker = asyncHandler(async (req, res) => {
    const { start } = req.body;
    const startTime = await TimeTracker.create({
        userId: req.user._id,
        taskId: req.params.taskId,
        startDateTime: start,
    });
    if (!startTime) {
        throw new CustomError(400, "failed to start timer");
    }
    res.status(201).json(new CustomResponse(201, "timer started", startTime));
});

const endTimeTracker = asyncHandler(async (req, res) => {
    const { end } = req.body;
    const endTime = await TimeTracker.findById(req.params.id);
    if (!endTime) {
        throw new CustomError(400, "something went wrong");
    }
    endTime.endDateTime = end;
    await endTime.save({ validateBeforeSave: false });
    res.status(200).json(new CustomResponse(200, "timer ended", endTime));
});

const getAllTimeTrackers = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user._id;
    const timeTrackers = await TimeTracker.find({ taskId, userId });
    if (!timeTrackers) {
        throw new CustomError(400, "something went wrong");
    }
    res.status(200).json(
        new CustomResponse(200, "time trackers", timeTrackers)
    );
});

const deleteTimer = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const timer = await TimeTracker.deleteMany({ taskId });
    if (!timer) {
        throw new CustomError(400, "failed to delete timer");
    }
    res.status(200).json(
        new CustomResponse(200, "deleated sucessfully", timer)
    );
});

export { startTimeTracker, endTimeTracker, getAllTimeTrackers, deleteTimer };
