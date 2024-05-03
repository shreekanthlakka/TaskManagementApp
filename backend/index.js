import dotenv from "dotenv";
dotenv.config();

import { connectWithDB } from "./config/db.js";
import { configCloudinary } from "./config/cloudinary.js";

connectWithDB();
configCloudinary();
import app from "./app.js";

app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`)
);
