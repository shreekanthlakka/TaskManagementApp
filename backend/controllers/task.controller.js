import { validationResult } from "express-validator";
import Task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";
import { v2 as cloudinary } from "cloudinary";

const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    if (!tasks) {
        throw new CustomError(400, "No tasks found");
    }
    res.status(200).json(new CustomResponse(200, "all tasks", tasks));
});

const createTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "Invalid data entered", errors.array()));
    }
    // let file;
    // let responce;
    // if (req.files) {
    //     file = req.files.taskfile.tempFilePath;
    //     responce = await cloudinary.uploader.upload(file, {
    //         folder: "taskfiles",
    //         width: 150,
    //         crop: "scale",
    //     });
    // }

    console.log("files ====> ", req.file);
    // console.log("res from  clodinary ", responce);

    const { title, description, priority, duedate } = req.body;
    const task = await Task.create({
        userId: req.user._id,
        title,
        description,
        priority,
        duedate,
        // taskfile: {
        //     url: responce.secure_url,
        // },
    });
    if (!task) {
        throw new CustomError(400, "failed creating task");
    }
    res.status(201).json(new CustomResponse(200, "created sucessfully", task));
});

const getTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const task = await Task.findById(req.params.taskId);
    if (!task) {
        throw new CustomError(404, "No task found by this id");
    }
    res.status(200).json(
        new CustomResponse(200, "fetched task details sucessfully", task)
    );
});

const updateTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const task = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
            title,
            description,
            priority,
            duedate,
        },
        { new: true }
    );
    if (!task) {
        throw new CustomError(400, "failed to update task");
    }
    res.status(200).json(new CustomResponse(200, "updated sucessfully", task));
});

const deleteTask = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "bad request", errors.array()));
    }
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
        throw new CustomError(404, "no task with this id found!");
    }
    res.status(200).json(new CustomResponse(200, "deleated sucessfully", task));
});

export { createTask, getTask, updateTask, deleteTask, getAllTasks };
