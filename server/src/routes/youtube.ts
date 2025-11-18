import express from "express";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { getLatestVideos } from "../utils/getLatestVideos";
const router = express.Router();

const filePath = path.join(__dirname, "..", "youtubeList.json");

router.get("/", async (req, res, next) => {
  let content: any[] | undefined;
  if (!fs.existsSync(filePath)) {
    console.log('here')
    await getLatestVideos().then((data) => (content = data));
    if (content) {
      fs.writeFile(filePath, JSON.stringify(content), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.status(200).send(content);
        }
      });
    }
    return;
  }
  res.status(200).json(filePath);
});

export default router;
