const generateUniqueIDArray = (
  arr: any[],
  { check = "_id", latestBottom = false } = {}
) => {
  const ids: any[] = [];

  // Filter out duplicate objects based on the _id field
  const newArr = arr.filter((obj) => {
    const isIdPresent = ids.includes(obj[check]);

    if (!isIdPresent) {
      ids.push(obj[check]);
      return true; // Include this object in the result array
    }

    return false; // Exclude this object from the result array
  });

  if (latestBottom) {
    newArr.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } else {
    newArr.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return newArr;
};

export default generateUniqueIDArray;
