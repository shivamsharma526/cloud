import {Router} from "express";
import { filecreate } from "../controllers/file.controller.js";
import upload from "../utils/multer.util.js";
const fileRoute = Router();

fileRoute.post("/upload" ,upload.single("file")  , filecreate)

export default fileRoute