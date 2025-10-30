import express from "express";
const router = express.Router();
import db from "../models/index";
import { verifyUser } from "../middleware/auth";
const { PastorMessage } = db;

router.get("/", async (req, res, next) => {
  try {
    const pastorMessage = await PastorMessage.findAll({ limit: 1 });
    res.status(200).json(pastorMessage);
  } catch (err) {
    next(err);
  }
});

router.post("/", verifyUser, async (req, res, next) => {
  const { author, message } = req.body;
  try {
    const pastorMessage = await PastorMessage.create({
      author: author,
      message: message,
    });
    res.status(200).json(pastorMessage);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", verifyUser, async (req, res, next) => {
  const id = req.params.id;
  const { author, message } = req.body;
  try {
    const pastorMessage = await PastorMessage.findByPK(id);
    if (!pastorMessage) {
      res.status(404).json({ message: "Message does not exist" });
      return;
    }
    await pastorMessage.update({ author: author, message: message });
    res.status(200).json(pastorMessage);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyUser, async (req, res, next) => {
  const id = req.params.id;
  try {
    const pastorMessage = await PastorMessage.findByPK(id);
    if (!pastorMessage) {
      res.status(404).json({ message: "Message does not exist" });
      return;
    }
    await pastorMessage.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
