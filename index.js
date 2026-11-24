
import { config } from "dotenv";
config();

import db from "./src/config/database.js";
import app from "./src/app.js";
import authRouter from "./src/routes/auth.route.js";
import fileRoute from "./src/routes/file.route.js";


await db();

app.use("/api/auth", authRouter);
app.use("/api/file" , fileRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});
