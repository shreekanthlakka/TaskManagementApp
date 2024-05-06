import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import User from "../models/user.model.js";
import { createToken } from "../utils/createTokens.js";
import { CustomResponse } from "../utils/customResponse.js";

const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "invalid details", errors.array()));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError(401, "Email or Password is incorrect");
    }
    const isPasswordValid = await user.isValidatePasswords(password);
    if (!isPasswordValid) {
        throw new CustomError(401, "Email or Password is incorrect");
    }
    if (isPasswordValid) {
        await createToken(user._id, res);
    }
});

const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validations failed", errors.array()));
    }
    const { name, email, password, phonenumber, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        phonenumber,
        role,
    });
    if (!user) {
        throw new CustomError(400, "failed to create user");
    }
    res.status(201).json(
        new CustomResponse(201, "User created successfully!", user)
    );
});

const logout = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("+accessToken");
    if (!user) {
        throw new CustomError(404, "error in logging out");
    }
    user.accessToken = null;
    await user.save();
    const options = {
        httpOnly: true,
        maxAge: 0,
    };
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new CustomResponse(200, "Logged out Successfully"));
});

const getLoggedInUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new CustomError(400, "Invalid Token or not logged in");
    }
    res.status(200).json({
        status: 200,
        message: "Successfuly fetched user details.",
        isAuthenticated: true,
        data: user,
        success: true,
    });
});

const getAllUserData = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (!users) {
        throw new CustomError(400, "No users found");
    }
    res.status(200).json(new CustomResponse(200, "all users", users));
});

export { login, register, logout, getLoggedInUserDetails, getAllUserData };
