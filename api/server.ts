import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import chatRoutes from "./routes/chat.routes";
import dotenv from "dotenv";

dotenv.config({
  path: `${process.cwd()}/api/.env`,
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/chat", chatRoutes);

app.listen(3000, () => {
  console.log("API running on 3000");
});