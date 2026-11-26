import { Router } from "express";
import urlRouter from "./url/url.controller.js";

const router = Router();
router.use("/url", urlRouter);
router.get("/", (req, res) => {
  res.status(200).json({ Working: "Working well" });
});
export default router;
