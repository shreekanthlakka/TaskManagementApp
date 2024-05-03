class CustomError extends Error {
    constructor(status, message = "something went wrong", error) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = [];
        this.success = false;
        this.error = error;
    }
}

export { CustomError };
