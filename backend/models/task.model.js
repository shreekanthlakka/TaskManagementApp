import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
        },
        status: {
            type: String,
            default: "pending", //pending , complete ,
        },
        duedate: {
            type: Date,
            // default: new Date(Date.now() + 24 * 60 * 60 * 1000), // one
        },
        taskfile: {
            id: {
                type: String,
                default: "id",
            },
            url: {
                type: String,
                default: "url",
            },
        },
        assignedTo: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                name: { type: String },
                email: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
