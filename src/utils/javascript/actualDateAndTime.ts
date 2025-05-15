const actualDateAndTime = (dateString: string) => {
  const date = new Date(dateString);

  const dayMonth = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dayMonth;
};

export default actualDateAndTime;
