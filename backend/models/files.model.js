import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        taskId: { type: mongoose.Schema.Types.ObjectId, red: "Task" },
        taskfiles: [
            {
                id: { type: String },
                url: { type: String },
                orginalPath: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
