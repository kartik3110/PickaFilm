import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//custom error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong" } = err;
  console.log("last handler: ", message);
  res.status(status).json({ success: false, status, err: message });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port 3000");
});
