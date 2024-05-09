import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";
import { mailSender } from "./mailSender.js";

const redisClient = createClient();

async function sendMailFun(message) {
    // console.log("message", message);
    const task = JSON.parse(message.element);
    console.log("task details ===> ", task);
    const mailList = [...task.assignedTo];
    for (let i = 0; i < mailList.length; i++) {
        const message = {
            to: mailList[i].email,
            subject: "A Task has been assigned to you",
            html: `<div>
            <h1>Task Details for task ${task.title}</h1>
            <p>Description : ${task.description}</p>
            <p>priority : ${task.priority}</p>
            <p>DueDate : ${task.duedate}</p>
            <a href=${task.taskfile?.url}>Click to see task file</a>
            </div>`,
        };
        await mailSender(message);
        console.log("mail sent to", mailList[i].email);
    }
}

async function startWorker() {
    try {
        await redisClient.connect();
        console.log("connected to redis client");
        while (1) {
            const message = await redisClient.brPop("emailQueue", 0);
            await sendMailFun(message);
        }
    } catch (error) {
        console.log("error connecting client", error);
    }
}

startWorker();
