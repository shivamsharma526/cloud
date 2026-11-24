import userModel from "../models/auth.model.js";
import AppError from "../utils/error.utils.js";
import generateToken from "../utils/jsonwebtoken.utils.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const userIsAlreadyExit = await userModel.findOne({ email });
    console.log(userIsAlreadyExit);

    if (userIsAlreadyExit) {
      throw new AppError("user already exits", 409);
    }

    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }
    
    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = generateToken(user._id);
    res.cookie("token", token);

    res.status(201).json({ message: "user Create Successfully" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userIsAlreadyExit = await userModel.findOne({ email });
    if (!userIsAlreadyExit) {
      throw new AppError("user Note Found", 404);
    }
    const isPassword = await bcrypt.compare(
      password,
      userIsAlreadyExit.password,
    );
    if (!isPassword) {
      throw new AppError("email and password incorrect", 401);
    }
    const token = generateToken(userIsAlreadyExit._id);
    res.cookie("token", token);

    res.status(200).json({
      message: "user login successfully",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
}
