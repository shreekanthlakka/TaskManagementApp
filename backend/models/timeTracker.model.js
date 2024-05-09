import mongoose from "mongoose";
import { parseISO, differenceInMinutes } from "date-fns";

const timeTrackerSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        startDateTime: { type: Date },
        endDateTime: { type: Date },
        duration: { type: Number },
        isSessionClosed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

timeTrackerSchema.post("save", function () {
    const startTime = this.startDateTime;
    if (this.startDateTime < this.endDateTime) {
        const endTime = this.endDateTime;
        const duration = differenceInMinutes(endTime, startTime);
        this.duration = duration;
    }
});

const TimeTracker = mongoose.model("TimeTracker", timeTrackerSchema);

export default TimeTracker;
