const getMonthAndYear = (dateString: string) => {
  const date = new Date(dateString);

  const monthAndYear = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return monthAndYear;
};

export default getMonthAndYear;
