// src/controller/user.controller.js
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import responseHandler from "../utils/responseHandler.js";
import { sendToken } from "../utils/token.js";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if email or username already exists
    const [emailExists, usernameExists] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (emailExists)
      return next(responseHandler.errorResponse("Email already exists", 400));
    if (usernameExists)
      return next(responseHandler.errorResponse("Username already exists", 400));

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const { accessToken, refreshToken, cookieOptions } = sendToken(newUser);

    // Set cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return responseHandler.successResponse(
      res,
      accessToken,
      "User registered successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) return next(responseHandler.notFoundResponse("Account not found"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(responseHandler.unauthorizedResponse("Incorrect credentials"));

    const { accessToken, refreshToken, cookieOptions } = sendToken(user);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return responseHandler.successResponse(res, accessToken, "Login successful", 200);
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER
export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).lean();
    return responseHandler.successResponse(res, user, "User found", 200);
  } catch (error) {
    next(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("+refreshToken");
    if (!user) return next(responseHandler.errorResponse("User not found"));

    const refreshedToken = user.refreshToken;

    // Optional: verify refresh token with jwt.verify if needed

    const { accessToken } = sendToken(user); // generate new access token
    return responseHandler.successResponse(res, accessToken, "Access token refreshed", 200);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    return responseHandler.successResponse(res, null, "Logout successful", 200);
  } catch (error) {
    next(error);
  }
};


// Export all controllers
export default {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  refreshToken,
};