import fileModel from "../models/file.model.js";
import path from "path";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";
import userModel from "../models/auth.model.js";
export async function filecreate(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError("Unauthorize user", 404);
    }

    const isTokenValid = await jwt.verify(token, process.env.JWT_TOKEN);
    if (!isTokenValid) {
      throw new AppError("Unauthorize token", 404);
    }
    const user = await userModel.findById(isTokenValid.id);

    if (!user) {
      throw new AppError("Unauthorize user", 404);
    }
    

    console.log(req.file);
    const folder = path.basename(req.file.destination);
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${folder}/${req.file.filename}`;

    const fileUpload = await fileModel.create({
        user:user._id,
    filename:req.file.originalname,
    fileType:req.file.mimetype,
    fileSize:req.file.size,
    filePath:fileUrl,

    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
}
