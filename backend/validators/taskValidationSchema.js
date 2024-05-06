const taskValidationSchema = {
    title: {
        in: ["body"],
        exists: {
            errorMessage: "Title is required",
        },
        notEmpty: {
            errorMessage: "Title should not be empty",
        },
        trim: true,
    },
    description: {
        in: ["body"],
        exists: {
            errorMessage: "description  is required",
        },
        notEmpty: {
            errorMessage: "Description should not be empty",
        },
        trim: true,
    },
    priority: {
        in: ["body"],
        exists: {
            errorMessage: "priority is required",
        },
        notEmpty: {
            errorMessage: "Priority should not be empty",
        },
        trim: true,
        custom: {
            options: function (val) {
                if (!["high", "medium", "low"].includes(val)) {
                    throw new Error("Invalid value for priority");
                }
                return true;
            },
        },
    },
    status: {
        in: ["body"],
        exists: {
            errorMessage: "status is required",
        },
        notEmpty: {
            errorMessage: "Status should not be empty",
        },
        trim: true,
    },
    duedate: {
        in: ["body"],
        exists: {
            errorMessage: "duedate is required",
        },
        notEmpty: {
            errorMessage: "Duedate should not be empty",
        },
        trim: true,
        custom: {
            options: function (val) {
                if (new Date(val) <= new Date()) {
                    throw new Error(
                        "The due date must be later than the current date"
                    );
                }
                return true;
            },
        },
    },
};

export { taskValidationSchema };
