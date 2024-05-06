import { createClient } from "redis";

const client = createClient();
client.on("error", (err) => console.log("redis client error", err));

const connectToRedis = async () => {
    try {
        await client.connect();
        console.log("connected to redis");
    } catch (error) {
        console.log("failed to connect to redis", error);
    }
};

export { connectToRedis, client };
