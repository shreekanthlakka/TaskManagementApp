import mongoose from "mongoose";

const connectWithDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((res) =>
            console.log("Database Connected Successfully", res.connection.host)
        )
        .catch((err) => console.error(`Error Connecting to Database: ${err}`));
};

export { connectWithDB };
