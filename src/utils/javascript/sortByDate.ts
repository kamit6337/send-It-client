type HasDates = {
  createdAt: string;
  updatedAt: string;
};

const sortByDate = <T extends HasDates>(arr: T[], createdAt = true): T[] => {
  if (!arr || arr.length === 0) return arr;

  const newArr = [...arr];

  if (createdAt) {
    newArr.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else {
    newArr.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  return newArr;
};

export default sortByDate;
