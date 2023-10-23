import ErrorHandler from '../utils/ErrorHandler.js'


export const isAuthenticated = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies["connect.sid"];
    if (!token) {
        return next(new ErrorHandler("Not logged in", 401))
    }
    next(); //isse se hum next middleware or function calling pr pahuch jaenge
}


export const authorizeAdmin = (req, res, next) => {
    if (req.user.role!=="admin") {
        return next(new ErrorHandler("Only Admin Allowed", 405))
    }
    next(); //isse se hum next middleware or function calling pr pahuch jaenge
}