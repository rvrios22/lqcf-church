const dateFormat = (input: string) => {
  const dateMatch = input.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z/);
  if (!dateMatch) return `date does not match input format ${input}`;
  const date = new Date(dateMatch[0]);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

export default dateFormat;
