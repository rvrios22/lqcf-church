import * as dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import YouTubeSearchResource from "../types/YouTubeSearchResource";

const CHANNEL_ID = "UCdRBymxVtTb5TgDSSnARfaA";

export async function getLatestVideos() {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", process.env.YT_KEY || "");
  url.searchParams.set("channelId", CHANNEL_ID);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("type", "video");

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error("YouTube API error:", await response.text());
    return;
  }

  const data = await response.json();
  const videos = data.items.map((item: YouTubeSearchResource) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    desc: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.high?.url,
    width: item.snippet.thumbnails.high.width,
    height: item.snippet.thumbnails.high.height,
  }));

  return JSON.stringify({ newestDate: videos[0].publishedAt, videos });
}
