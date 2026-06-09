import { Router } from "express";
import auth from "../middleware/auth";

const router = Router();

router.post("/:projectId", auth, async (req, res) => {
  const { message } = req.body;

  res.json({
    answer: `Agent: ${message}`,
  });
});

export default router;