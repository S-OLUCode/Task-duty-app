import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import morgan from "morgan";
import cors from "cors";


import {
  globalErrorHandler,
  catchNotFoundRoute,
} from "./src/middleware/errorHandler.js";

//import api routes
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
// import bookingRoutes from "./src/routes/booking.routes.js";
// import paymentRoutes from "./src/routes/payment.routes.js";
// import { rateLimiter } from "./src/middleware/rateLimit.js";
// import adminRoutes from "./src/routes/admin.routes.js";

//initialize express

const app = express();
const httpServer = createServer(app);

//middlewares - are functions that have access to the request, and response object, they can perform any task specified before the output is sent to the client.
//1 - request is received by the server
//2 - req is passed through the middleware functions
//3 - route handler processes the request
//4 - responses is sent back through the middleware functions
//5 - response is finally sent to the client

app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-duty-app-swart.vercel.app"], //allow requests from these origins
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], //
    optionsSuccessStatus: 200, //default status code
  })
);
// app.use(cookieParser()); //initialize coookie in app
app.use(express.json({ limit: "25mb" })); //parses our response body in a max size no greater than 25mb
// app.use(express.urlencoded({ extended: true, limit: "25mb" })); //parses url encoded data with query string library
// app.use(rateLimiter(100)); //apply rate limiting to all requests, max 100 requests per 15 minutes window
// app.disable("x-powered-by"); //disable x-powered-by header for security reasons

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //morgan is used to log http request to the terminal in dev mode
}
//get request time when server is running
// app.use((req, res, next) => {
//   req.requestTIME = new Date().toISOString();
//   next();
// });

//test api route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running!",
    environment: process.env.NODE_ENVx,
    time: req.requestTIME,
  });
});

//assemble api routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/task/update/:id", taskRoutes);
// app.use("/api/v1/booking", bookingRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/admin", adminRoutes);

//handle app errors
app.use((req, res, next) => {
  return next(catchNotFoundRoute(req, res));
});
app.use((err, req, res, next) => {
  return next(globalErrorHandler(err, req, res, next));
});

// database connection
const connectOptions = {
  dbName: "TaskDuty",
  serverSelectionTimeoutMS:
    process.env.NODE_ENV === "development" ? 45000 : 10000, //max time to wait for the server to be selected (45 secs in dev or 10s in prod). if no server selection, a server timeout error is thrown
  socketTimeoutMS: 30000, //time before socket timeout due to inactivity, useful to avoid hanging connections
  retryWrites: true, //enables automatic retry of some write operations insert or update a document
  retryReads: true, //enables automatic retry of read operations
  maxPoolSize: 100, //max number of connections in the mongoDB connection pool, it helps to manage concurrent requests.
  minPoolSize: 1, //min number of connections in the mongoDB connection pool
};

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
    //connection event handlers
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    //handle graceful shutdown
    const gracefulShutdown = async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed via app termination");
      process.exit(0); //exit the app process
    };
    process.on("SIGINT", gracefulShutdown); //signal interruption (ctrl + c)
    process.on("SIGTERM", gracefulShutdown); //signal termination
    return conn;
  } catch (error) {
    console.error("Error connection failed", error.message);
    process.exit(1); //exit the process, 1 usually indicates error/failure
  }
};

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION, shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
  //application specific logging, throwing an error, or other logic here
});

//server config
const PORT = process.env.PORT || 4300;
const startServer = async () => {
  try {
    await connectToDb();
    const server = httpServer.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
    // handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! shutting down...");
      console.error(err.name, err.message);
      // close server & exit process
      server.close(() => {
        console.log("Process terminated due to unhandled rejection");
      });
    });
    // handle graceful shutdown on termination signals
    const shutDown = async () => {
      console.log("Receiving shutdown signal. Closing server...");
      server.close(() => {
        console.log("Server closed successfully.");
        process.exit(0); // exit process
      });
    };
    //handle termination signals
    process.on("SIGTERM", shutDown);
    process.on("SIGINT", shutDown);
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1); // exit process with failure
  }
};

//start the server
startServer();
