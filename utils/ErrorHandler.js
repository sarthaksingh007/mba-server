class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message) //this is parent class constructor
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;