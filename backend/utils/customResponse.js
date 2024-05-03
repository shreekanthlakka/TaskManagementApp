class CustomResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message || "success";
        this.data = data || [];
        this.success = true;
    }
}

export { CustomResponse };
