import responseHandler from "../utils/responseHandler.js";

//error handler for dev environment

const sendErrorDev = (err, res) => {
    const errorResponse = {
        status: err.status || "error",
        message: err.message,
        stack: err.stack,
        error: {
            name: err.name,
            statusCode: err.statusCode,
            isOperational: err.isOperational,
        },
    };
    console.error("ERROR", err);
    res.status(err.statusCode || 500).json(errorResponse);
};

//send error for production environment
const sendErrorProd = (err, res) => {
     //if operational, trusted error: send message to client
     if (err.isOperational) {
        const errorResponse = {
            status: err.status || "error",
            message: err.message,
        };
        return res.status(err.statusCode || 500).json(errorResponse);
    } 
    //programming or other unknown error: don't leak error details or send to client
    console.error("ERROR", err);
    return res.status(err.statusCode).json({
        status: "error",
        message: "Something went very wrong!",
    });  
};

//handle jwt errors
const handleJWTError = () => {
    return responseHandler.unauthorizedResponse("Invalid token. Please log in again.");
};

const handleJWTExpiredError = () => {
    return responseHandler.unauthorizedResponse("Your token has expired! Please log in to gain access.");
};


//global error handling middleware
export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }  else if (process.env.NODE_ENV === "production") {
        let error = { ...err, message: err.message, name: err.name };
        if (error.name === "JsonWebTokenError") error = handleJWTError();
        if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};

//catch 404 errors routes
export const catchNotFoundRoute = (req, res) => {
    return responseHandler.notFoundResponse(`cannot find ${req.originalUrl} on this server`);
};
    