
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { connectDatabase } from "./config/db";
import { errorHandler, notFound } from "./middleware/errors";
import alertsRouter from "./routes/alerts";
import astronautsRouter from "./routes/astronauts";
import authRouter from "./routes/auth";
import devRouter from "./routes/dev";
import missionRouter from "./routes/mission";
import telemetryRouter from "./routes/telemetry";

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (process.env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(origin))) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin is not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(503).json({ message: "Database unavailable" });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/astronauts", astronautsRouter);
app.use("/api/telemetry", telemetryRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/mission", missionRouter);
app.use("/api/dev", devRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
