const checkLastPublishDate = (publishDate: string) => {
  const lastUpdated = new Date(publishDate);
  const isOlderThan7Days =
    Date.now() - lastUpdated.getTime() > 7 * 24 * 60 * 60 * 1000;
  return isOlderThan7Days;
};

export default checkLastPublishDate;
