const generateUniqueIDArray = (arr: any[], check = "_id") => {
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

  return newArr;
};

export default generateUniqueIDArray;
