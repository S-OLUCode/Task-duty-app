//classes are like templates for creating javascript objects. They inherit the existing properties and are initialized with a constructor.

import { stat } from "fs";

//a constructor is a method for creating and initializing an object instance of a class, while super keyword is used to call and invoke the parent class which gives access to its properties and methods.
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message); //call parent class constructor, invoke message to be used in Error class
    this.statusCode = statusCode; //http status code recieved from the error constructor
    const statusCodeString = statusCode.toString();
    this.status = statusCodeString.startsWith("4") ? "fail" : "error"; //determine if error is client or server side based on status code
    this.success = false; //mark as default error this will always be false cos we are handling error responses
    this.isOperational = true; //mark as operational error, trusted error we can send to client //distinguish btw error types- such as server shutdown, or connection, validation, authentication errors. But programmers errors such as bugs, syntax errors, or type errors should not be sent to the client.
  }
}

class ApiResponse {
  constructor( statusCode, data, message = "Success") {
    this.statusCode = statusCode; //http status code 
    this.data = data; //data to be sent in the response
    this.message = message; //message to be sent in the response
    this.success = statusCode < 400   //auto sets success to boolean true if status code is less than 400
  }
}   

const sendResponse = (res, statusCode, data = null, message = null) => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data,
  });
};

const successResponse = (res, data, message = "Request successful", statusCode = 200) => {
    return sendResponse(res, statusCode, data, message);
};

const errorResponse = ( message, statusCode = 500, data = null,) => {
    return new AppError(message, statusCode, data);
};

const notFoundResponse = (message = "Resource not found") => {
    return errorResponse(message, 404);
};

const unauthorizedResponse = (message = "Unauthorized") => {
    return errorResponse(message, 401);
};

const forbiddenResponse = (message = "Forbidden") => {
    return errorResponse(message, 403);
};

export default {
    ApiResponse,
    sendResponse,
    successResponse,
    errorResponse,
    notFoundResponse,
    unauthorizedResponse,
    forbiddenResponse,
};