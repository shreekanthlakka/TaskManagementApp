import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomResponse } from "../utils/customResponse.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { CustomError } from "../utils/customError.js";
import File from "../models/files.model.js";

const uploadFilesController = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user._id;
    const imageUrls = [];
    if (!req.files) {
        console.log("no req.files ");
        throw new CustomError(400, "files required");
    }
    // console.log("req.files taskfiles===> ", req.files.taskfiles);

    let ArrayOfFiles = [];
    if (
        typeof req.files.taskfiles === "object" &&
        !Array.isArray(req.files.taskfiles)
    ) {
        ArrayOfFiles.push(req.files.taskfiles);
    }
    if (Array.isArray(req.files.taskfiles)) {
        ArrayOfFiles = req.files.taskfiles;
    }
    for (let i = 0; i < ArrayOfFiles.length; i++) {
        const file = ArrayOfFiles[i].tempFilePath;
        const result = await uploadToCloudinary(file);
        if (result) {
            imageUrls.push({
                id: result?.public_id,
                url: result?.secure_url,
                orginalPath: result?.original_filename.split("#")[1],
            });
        }
    }
    const task = await File.create({
        taskId,
        userId,
        taskfiles: [...imageUrls],
    });
    console.log("task created ==> ", task);
    if (!task) {
        throw new CustomError(400, "failed to create files ");
    }
    res.status(200).json(new CustomResponse(200, "uploaded files", task));
});

const getAllFilesByTaskId = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const files = await File.find({ taskId });
    if (!files) {
        throw new CustomError(400, "failed to get files ");
    }
    res.status(200).json(new CustomResponse(200, "files", files));
});

export { uploadFilesController, getAllFilesByTaskId };
