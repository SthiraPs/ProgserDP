import express, { Request, Response, NextFunction, Application } from "express";
import connectDB from "./config/db";
import * as dotenv from "dotenv";
import cors from "cors";
import corsMiddleware from "./middleware/cors.middleware";
import catchAllMiddleware from "./middleware/catchAll.middleware";

import userRoutes from "./routes/users";
import requestsRoutes from "./routes/requests";
import rolesRoutes from "./routes/roles";
import departmentsRoutes from "./routes/departments";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3600;

// Connect to DB
connectDB();

app.use(corsMiddleware);

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/departments", departmentsRoutes);

app.all("*", catchAllMiddleware);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
