import jwt from "jsonwebtoken";

import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import User from "../models/user.model.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new CustomError(400, "not logged in ");
    }
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
        throw new CustomError(401, "User not found!");
    }
    req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    next();
});

const customRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return res
                .status(403)
                .json(
                    new CustomError(
                        403,
                        "You are not authorized to perform this action"
                    )
                );
        }
    };
};

export { isLoggedIn, customRole };
