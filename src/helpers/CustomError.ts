class CustomError extends Error {
    public status;
    constructor(message,status : number) {
        super(message);
        this.status = status;
    }
}
module.exports = CustomError