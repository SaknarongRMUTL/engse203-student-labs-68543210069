import express from "express";
import requestRoutes from "./routes/requestRoutes.js";
import { logger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(logger);
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Campus Service API is running", version: "1.0.0" });
  });
  app.use("/api/requests", requestRoutes);
  /**
   * TODO W06-A4 (🏠 CP07) · ปิดท้ายด้วย notFound แล้วตามด้วย errorHandler
   * ⚠ สองตัวนี้ต้องอยู่ท้ายสุด หลัง route ทั้งหมด
   */

  return app;
}
