const dayMonthYear = (dateString: string) => {
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    date = new Date(dateString);
  }

  const dayMonth = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return dayMonth;
};

export default dayMonthYear;
