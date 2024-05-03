import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const writeStreem = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: writeStreem }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE ,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use((req, res, next) => {
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`);
    next();
});

app.post("/api/v1/testFile", async (req, res) => {
    console.log("req.body :>> ", req.body);

    let file;
    let responce;
    if (req.files) {
        console.log("file upload ", req.files);
        file = req.files.taskfile.tempFilePath;
        console.log("FILE +++> ", file);
        responce = await cloudinary.uploader.upload(file, {
            folder: "taskfiles",
            width: 150,
            crop: "scale",
        });
        res.status(200).json(responce);
    }
});

import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;
