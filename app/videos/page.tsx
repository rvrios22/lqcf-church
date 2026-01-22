import YouTubeSquare from "@/components/YouTubeSquare";
import VideoTypes from "@/types/VideoTypes";
import YouTubeSearchResource from "@/types/YouTubeSearchResource";

const CHANNEL_ID = "UCdRBymxVtTb5TgDSSnARfaA";

export default async function Page() {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", process.env.YT_KEY || "");
  url.searchParams.set("channelId", CHANNEL_ID);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("type", "video");

  const res = await fetch(url.toString());
  const data = await res.json();
  const videos = data.items.map((item: YouTubeSearchResource) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    desc: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.high?.url,
    width: item.snippet.thumbnails.high.width,
    height: item.snippet.thumbnails.high.height,
  }));

  return (
    <>
      <h1 className="sub-header mb-4">Our Latest Videos</h1>
      <section className="md:grid md:grid-cols-2 lg:grid-cols-3">
        {videos.map(
          ({
            videoId,
            title,
            thumbnail,
            desc,
            publishedAt,
            height,
            width,
          }: VideoTypes) => (
            <YouTubeSquare
              key={videoId}
              videoId={videoId}
              title={title}
              thumbnail={thumbnail}
              desc={desc}
              publishedAt={publishedAt}
              height={height}
              width={width}
            />
          )
        )}
      </section>
    </>
  );
}
