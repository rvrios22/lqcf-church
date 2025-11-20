import VideoTypes from "../types/VideoTypes";
import dateFormat from "../utils/dateFormat";

function YouTubeSquare({
  videoId,
  title,
  thumbnail,
  desc,
  publishedAt,
  height,
  width,
}: VideoTypes) {
  return (
    <figure className="mx-auto mb-4 w-[90%]">
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={thumbnail}
          height={height}
          width={width}
          className="mx-auto rounded-2xl shadow-md"
        />
      </a>
      <h3 className="text-center text-lg font-semibold text-pretty md:text-xl">
        {title}
      </h3>
      <p className="general-text mt-0 text-sm text-pretty">
        {desc} Streamed on: {dateFormat(publishedAt)}
      </p>
    </figure>
  );
}

export default YouTubeSquare;
