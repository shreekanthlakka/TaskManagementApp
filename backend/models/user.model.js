import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        phonenumber: { type: String },
        role: {
            type: String,
            default: "user",
        },
        refreshToken: { type: String, select: false },
        accessToken: { type: String, select: false },
        forgotPasswordToken: { type: String, select: false },
        forgotPasswordExpiry: { type: String, select: false },
        loggedAt: { type: [Date], select: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// userSchema.methods.isValidatePassword = async function (password) {
//     console.log("password==>", password);
//     // const salt = await bcrypt.genSalt(this.password);
//     // const hashedPassword = await bcrypt.hash(password, salt);
//     return await bcrypt.compare(this.password, password);
//     // return hashedPassword === this.password;
// };

userSchema.methods.isValidatePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, {
        expiresIn: "10m",
    });
};

userSchema.methods.getForgotPasswordToken = async function () {
    const token = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return token;
};

const User = mongoose.model("User", userSchema);

export default User;
