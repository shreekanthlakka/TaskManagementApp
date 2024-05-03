import User from "../models/user.model.js";
import { CustomError } from "./customError.js";

const createToken = async (userObjId, res) => {
    try {
        const user = await User.findById(userObjId).select(
            "+refreshToken +accessToken +loggedAt"
        );
        if (!user) {
            throw {
                statusCode: 401,
                message: "User not found",
            };
        }
        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();
        user.accessToken = accessToken;
        user.loggedAt = [...user.loggedAt, new Date().toISOString()];
        await user.save({ validateBeforeSave: false });
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
        };
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                status: 200,
                success: true,
                message: "LoggedIn sucessfully",
                session: {
                    accessToken,
                },
                data: user,
            });
    } catch (error) {
        res.status(401).json(new CustomError(400, "Failed to login", error));
    }
};

export { createToken };
