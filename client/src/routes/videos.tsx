import { createFileRoute } from "@tanstack/react-router";
import { queryClient } from "../components/Providers";
import customFetch from "../utils/customFetch";
import VideoTypes from "../types/VideoTypes";
import YouTubeSquare from "../components/YouTubeSquare";
export const Route = createFileRoute("/videos")({
  component: RouteComponent,
  loader: async () => {
    const data = await queryClient.ensureQueryData({
      queryKey: ["youtube"],
      queryFn: () => customFetch("youtube"),
    });
    return data.videos as VideoTypes[];
  },
});

function RouteComponent() {
  const videos = Route.useLoaderData();
  return (
    <>
      <h1 className="sub-header mb-4">Our Latest Videos</h1>
      <section className="md:grid md:grid-cols-2 lg:grid-cols-3">
        {videos.map(
          ({ videoId, title, thumbnail, desc, publishedAt, height, width }) => (
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
          ),
        )}
      </section>
    </>
  );
}
