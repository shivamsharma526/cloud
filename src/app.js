import express from 'express';
import cookieParser from "cookie-parser";
const app = express()
import path from "path";

app.use("/uploads", express.static(path.resolve("public/uploads")))
app.use(express.json())
app.use(cookieParser());
export default app