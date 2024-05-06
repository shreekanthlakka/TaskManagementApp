import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        commentBody: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
