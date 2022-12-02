import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello Dev" });
});

export default router;
