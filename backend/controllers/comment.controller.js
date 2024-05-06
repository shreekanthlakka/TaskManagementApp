import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import { CustomResponse } from "../utils/customResponse.js";
import Comment from "../models/comment.model.js";

const createComment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validation errors", errors.array()));
    }
    const { commentBody } = req.body;
    const { taskId } = req.query;
    const comment = await Comment.create({
        userId: req.user._id,
        taskId,
        commentBody,
    });
    if (!comment) {
        throw new CustomError(400, "failed to create comment");
    }
    res.status(200).json(
        new CustomResponse(200, "comment created sucessfully", comment)
    );
});

const getAllComments = asyncHandler(async (req, res) => {
    const { taskId } = req.query;
    const comments = await Comment.find({ taskId }).populate({
        path: "userId",
        model: "User",
        select: ["name", "email"],
    });
    if (!comments) {
        throw new CustomError(400, "failed to get comments");
    }
    res.status(200).json(new CustomResponse(200, "all comments", comments));
});

const getCommentById = asyncHandler(async (req, res) => {
    const { taskId } = req.query;
    const { commentId } = req.params;
    const comment = await Comment.find({ _id: commentId, taskId });
    if (!comment) {
        throw new CustomError(400, "failed to get comment");
    }
    res.status(200).json(new CustomResponse(200, "comment fetched", comment));
});
const updateCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
            commentBody: req.body.commentBody,
            userId: req.user._id,
        },
        { new: true }
    );
    if (!comment) {
        throw new CustomError(400, "failed to update comment");
    }
    res.status(200).json(
        new CustomResponse(200, "updated sucessfully", comment)
    );
});
const deleteCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
        throw new CustomError(400, "failed to delete comment");
    }
    res.status(200).json(
        new CustomResponse(200, "deleted successfully", comment)
    );
});

export {
    createComment,
    getAllComments,
    getCommentById,
    updateCommentById,
    deleteCommentById,
};
