export const getFormattedDateString = (date: Date) => {
  const month = date.toLocaleString("en-us", { month: "short" });
  return `${month} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
};
