import User from "../models/user.model.js";

const userValidationSchema = {
    name: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "name field cannot be empty",
        },
        exists: {
            errorMessage: "name filed is required",
        },
    },
    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "email field cannot be left blank",
        },
        exists: {
            errorMessage: "email field is required",
        },
        isEmail: {
            errorMessage: "Please provide a valid email address",
        },
        custom: {
            options: async function (val) {
                const user = await User.findOne({ email: val });
                if (user) throw new Error("User with this email already exist");
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        trim: true,
        notEmpty: true,
        exists: {
            errorMessage: "password field is required",
        },
    },
    role: {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "Role must be provided",
        },
        notEmpty: {
            errorMessage: "Role can not be empty",
        },
        custom: {
            options: async function (val) {
                if (!["admin", "user"].includes(val)) {
                    throw new Error(`Invalid Role value `);
                }
                return true;
            },
        },
    },
    phonenumber: {
        in: ["body"],
        trim: true,
        exists: {
            errorMessage: "Phone number should be provided",
        },
        notEmpty: {
            errorMessage: "Phone number cannot be empty",
        },
    },
};

export { userValidationSchema };
