import nodemailer from "nodemailer";

const mailSender = async (message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_NM,
        port: process.env.PORT_NM,
        auth: {
            user: process.env.USER_NM,
            pass: process.env.PASS_NM,
        },
    });
    const mssObj = {
        from: "support@taskmanagementapp.com",
        to: message.to,
        subject: message.subject,
        html: message.html,
    };
    try {
        await transporter.sendMail(mssObj);
    } catch (error) {
        console.log(error);
    }
};

export { mailSender };
