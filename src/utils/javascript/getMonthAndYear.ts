const getMonthAndYear = (dateString: string) => {
  const date = new Date(dateString);

  const monthAndYear = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return monthAndYear;
};

export default getMonthAndYear;
