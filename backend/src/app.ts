
import { connectDatabase } from "./config/db";

app.use(async (_req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(503).json({
      message: "Database unavailable"
    });
  }
});
