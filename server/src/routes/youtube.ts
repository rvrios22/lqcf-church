import express from "express";
import fs from "fs";
import path from "path";
import { getLatestVideos } from "../utils/getLatestVideos";
import checkLastPublishDate from "../utils/checkLastPublishDate";
const router = express.Router();

const filePath = path.join(__dirname, "..", "youtubeList.json");

router.get("/", async (req, res, next) => {
  //if file does not exist
  if (!fs.existsSync(filePath)) {
    try {
      const videos = await getLatestVideos();
      if (!videos) {
        res.status(500).json({ message: "Failed to fetch videos" });
        return;
      }
      res.status(200).json(JSON.parse(videos));
      fs.writeFile(filePath, videos, (err) => {
        if (err) {
          console.log(err);
          next(err);
          return;
        }
      });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }

  fs.readFile(filePath, "utf8", async (err, fileData) => {
    if (err) {
      console.error(err);
      next(err);
      return;
    }
    const data = JSON.parse(fileData);
    // if file exists but is more than a week after latest publish date
    if (checkLastPublishDate(data.newestDate)) {
      try {
        const videos = await getLatestVideos();
        if (!videos) {
          res.status(500).json({ message: "Failed to fetch videos" });
          return;
        }
        res.status(200).json(JSON.parse(videos));
        fs.writeFile(filePath, videos, (err) => {
          if (err) {
            console.log(err);
            next(err);
            return;
          }
        });
        return;
      } catch (err) {
        next(err);
        return;
      }
    }
    //if data exists and is fresh
    res.status(200).json(data);
  });
});

export default router;
