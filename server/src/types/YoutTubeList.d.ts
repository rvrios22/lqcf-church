import YouTubeSearchResource from "./YouTubeSearchResource";
interface YouTubeList {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: integer;
    resultsPerPage: integer;
  };
  items: YouTubeSearchResource[];
}

export default YouTubeList;
